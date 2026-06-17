#!/usr/bin/env node
// One-time / occasional re-sync tool. Reads data/favorites.kml (the
// landlords' Google My Map export) and fully overwrites
// src/content/guide.json with categories + spots derived from the
// KML's <Folder>/<Placemark> tree.
//
// After this runs the CMS at /admin is the source of truth — landlords
// edit spots there. Re-run this script only when they want to re-import
// the My Map from scratch (which discards any CMS edits).
//
// Snapshot the current guide.json with a git commit BEFORE running this,
// so the prior version stays recoverable.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const KML_PATH = resolve(ROOT, 'data/favorites.kml')
const OUT_PATH = resolve(ROOT, 'src/content/guide.json')

// Layer-name → category-id. Stable ids so CMS edits don't drift when
// the KML re-imports under the same layer.
function categoryIdFor(layerName) {
  return slugify(layerName)
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// KML descriptions may carry HTML — strip to plain text. Also pull out
// the first http(s) URL we find and surface it as `link`.
function cleanDescription(raw) {
  if (!raw) return { why: '', link: '' }
  const stripped = String(raw)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  const urlMatch = stripped.match(/https?:\/\/[^\s)]+/)
  const link = urlMatch ? urlMatch[0] : ''
  const why = link ? stripped.replace(link, '').trim() : stripped
  return { why, link }
}

function parseCoordinates(raw) {
  if (!raw) return null
  // KML format: "lng,lat[,elevation]" — note the order is LNG FIRST,
  // not lat first. Reversed coords land in the wrong hemisphere.
  const [lngStr, latStr] = String(raw).trim().split(',')
  const lng = parseFloat(lngStr)
  const lat = parseFloat(latStr)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return { lat, lng }
}

function toArray(x) {
  if (x == null) return []
  return Array.isArray(x) ? x : [x]
}

async function main() {
  const kmlRaw = await readFile(KML_PATH, 'utf8')
  const parser = new XMLParser({
    ignoreAttributes: false,
    cdataPropName: '__cdata',
    textNodeName: '#text',
    parseTagValue: false,
  })
  const parsed = parser.parse(kmlRaw)

  const doc = parsed?.kml?.Document
  if (!doc) throw new Error('No <kml><Document> found in KML')
  const folders = toArray(doc.Folder)
  if (folders.length === 0) throw new Error('No <Folder> layers in KML')

  // Build categories. Each Folder → one GuideCategory.
  // Dedupe rule: if the same Placemark (by name + ~rounded coords)
  // appears in multiple Folders, keep only the FIRST appearance in
  // the priority order below.
  const PRIORITY_ORDER = ['Parks & Rec', 'Restaurants', 'Things to Do']
  const seenKeys = new Set()
  const dedupeKey = (name, lat, lng) =>
    `${name.toLowerCase()}|${lat.toFixed(5)},${lng.toFixed(5)}`

  // Sort folders by priority so "Parks & Rec" wins the Downtown Cary
  // Park duplicate against "Things to Do".
  const folderByName = new Map(folders.map((f) => [extractText(f.name), f]))
  const orderedFolders = PRIORITY_ORDER.filter((n) => folderByName.has(n)).map(
    (n) => folderByName.get(n),
  )
  // Append any folders not in PRIORITY_ORDER at the end (defensive).
  for (const f of folders) {
    const name = extractText(f.name)
    if (!PRIORITY_ORDER.includes(name)) orderedFolders.push(f)
  }

  const categoriesBuilt = []
  const missing = { why: [], town: [] }

  for (const folder of orderedFolders) {
    const layerName = extractText(folder.name)
    const placemarks = toArray(folder.Placemark)
    const spots = []
    for (const pm of placemarks) {
      const name = extractText(pm.name)
      if (!name) continue

      const coords = parseCoordinates(
        extractText(pm?.Point?.coordinates),
      )
      if (!coords) {
        console.warn(`  ✗ ${name}: missing/invalid coordinates`)
        continue
      }

      const key = dedupeKey(name, coords.lat, coords.lng)
      if (seenKeys.has(key)) {
        console.log(`  · ${name}: duplicate (kept in higher-priority layer)`)
        continue
      }
      seenKeys.add(key)

      const { why, link } = cleanDescription(extractText(pm.description))
      const spot = {
        id: slugify(name),
        name,
        town: '',
        why,
        link,
        lat: coords.lat,
        lng: coords.lng,
      }
      if (!why) missing.why.push(`${layerName}/${name}`)
      if (!spot.town) missing.town.push(`${layerName}/${name}`)
      spots.push(spot)
    }
    categoriesBuilt.push({
      id: categoryIdFor(layerName),
      title: layerName,
      spots,
    })
  }

  // Restore the original PRIORITY display order in the output (so the
  // CMS lists Restaurants → Things to Do → Parks & Rec, matching how
  // the My Map presents the layers).
  const DISPLAY_ORDER = ['Restaurants', 'Things to Do', 'Parks & Rec']
  categoriesBuilt.sort((a, b) => {
    const ai = DISPLAY_ORDER.indexOf(a.title)
    const bi = DISPLAY_ORDER.indexOf(b.title)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  const output = { categories: categoriesBuilt }
  await writeFile(OUT_PATH, JSON.stringify(output, null, 2) + '\n')

  const totalSpots = categoriesBuilt.reduce((n, c) => n + c.spots.length, 0)
  console.log(`\n[import-kml] wrote ${OUT_PATH}`)
  console.log(`[import-kml] ${totalSpots} spots across ${categoriesBuilt.length} categories:`)
  for (const cat of categoriesBuilt) {
    console.log(`  ${cat.title.padEnd(20)} ${cat.spots.length}`)
  }
  if (missing.why.length > 0) {
    console.log(`\n[import-kml] ${missing.why.length} spot${missing.why.length === 1 ? '' : 's'} need a "why" note (add via /admin → Guide):`)
    for (const m of missing.why) console.log(`  - ${m}`)
  }
  if (missing.town.length > 0) {
    console.log(`\n[import-kml] ${missing.town.length} spot${missing.town.length === 1 ? '' : 's'} have no town set:`)
    for (const m of missing.town) console.log(`  - ${m}`)
  }
}

// Helpers: extract string text from a node that might be a string,
// a { '#text': '...' } object, or a { __cdata: '...' } object.
function extractText(node) {
  if (node == null) return ''
  if (typeof node === 'string') return node.trim()
  if (typeof node === 'number') return String(node)
  if (typeof node === 'object') {
    if (typeof node.__cdata === 'string') return node.__cdata.trim()
    if (typeof node['#text'] === 'string') return node['#text'].trim()
  }
  return ''
}

await main()
