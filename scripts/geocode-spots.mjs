#!/usr/bin/env node
// Geocode guide spots once at build time using OpenStreetMap Nominatim
// (no API key, no auth). Writes results to src/content/geocode-cache.json
// keyed by spot id, so guide.json stays editable via the CMS without
// clobbering coordinates.
//
// Resolution at runtime (handled in SpotsMap.tsx):
//   explicit spot.lat/lng → geocode-cache[id] → skip pin (logged).
//
// Fail-soft: on any network/parse error this exits 0 with a warning,
// so a Nominatim hiccup during CI never breaks the Vercel deploy.
// The committed cache is the source of truth in that case.

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const GUIDE_PATH = resolve(ROOT, 'src/content/guide.json')
const CACHE_PATH = resolve(ROOT, 'src/content/geocode-cache.json')

// Nominatim policy: descriptive UA + ≤1 req/s.
const USER_AGENT = 'bashford-tenant-app/0.1 (geocode-build-step; jschmittj1@gmail.com)'
const THROTTLE_MS = 1100

function buildQuery(spot) {
  if (spot.address && spot.address.trim()) return spot.address.trim()
  const parts = [spot.name]
  if (spot.town) parts.push(spot.town)
  parts.push('North Carolina')
  return parts.join(', ')
}

async function geocode(query) {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('q', query)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '1')
  url.searchParams.set('countrycodes', 'us')

  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) return null
  const { lat, lon } = data[0]
  return { lat: parseFloat(lat), lng: parseFloat(lon) }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const guide = JSON.parse(await readFile(GUIDE_PATH, 'utf8'))
  const cache = existsSync(CACHE_PATH)
    ? JSON.parse(await readFile(CACHE_PATH, 'utf8'))
    : {}

  const spots = guide.categories.flatMap((c) => c.spots)
  const todo = spots.filter(
    (s) =>
      s.lat == null &&
      s.lng == null &&
      !cache[s.id]
  )

  if (todo.length === 0) {
    console.log(`[geocode] ${spots.length} spots, cache covers all — nothing to do.`)
    return
  }

  console.log(
    `[geocode] resolving ${todo.length} new spot${todo.length === 1 ? '' : 's'} (Nominatim, 1 req/s)…`
  )

  const missed = []
  for (const spot of todo) {
    const query = buildQuery(spot)
    try {
      const hit = await geocode(query)
      if (hit) {
        cache[spot.id] = { ...hit, query, resolvedAt: new Date().toISOString() }
        console.log(`  ✓ ${spot.id} → ${hit.lat.toFixed(4)}, ${hit.lng.toFixed(4)}  (${query})`)
      } else {
        missed.push({ id: spot.id, query })
        console.warn(`  ✗ ${spot.id} → no results for "${query}"`)
      }
    } catch (err) {
      missed.push({ id: spot.id, query, error: String(err) })
      console.warn(`  ✗ ${spot.id} → ${String(err)}`)
    }
    await sleep(THROTTLE_MS)
  }

  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n')
  console.log(`[geocode] wrote ${CACHE_PATH}`)

  if (missed.length > 0) {
    console.warn(
      `[geocode] ${missed.length} unresolved — add an "address" or explicit lat/lng to these spots in guide.json:`
    )
    for (const m of missed) console.warn(`  - ${m.id}: ${m.query}`)
  }
}

try {
  await main()
} catch (err) {
  // Fail-soft: warn but exit 0 so Vercel build isn't blocked by a network hiccup.
  console.warn('[geocode] failed, falling back to existing cache:', err)
  process.exit(0)
}
