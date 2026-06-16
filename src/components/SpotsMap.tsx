import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { guide, type GuideSpot } from '../config/property'
import geocodeCache from '../content/geocode-cache.json'

type ResolvedSpot = GuideSpot & { lat: number; lng: number; category: string }

// Each spot's coords come from (1) explicit lat/lng on the spot in
// guide.json, or (2) the build-time geocode cache keyed by id. Spots
// with neither are dropped and logged once.
function resolveSpots(): ResolvedSpot[] {
  const cache = geocodeCache as Record<string, { lat: number; lng: number }>
  const resolved: ResolvedSpot[] = []
  const missing: string[] = []

  for (const category of guide) {
    for (const spot of category.spots) {
      const lat = spot.lat ?? cache[spot.id]?.lat
      const lng = spot.lng ?? cache[spot.id]?.lng
      if (lat != null && lng != null) {
        resolved.push({ ...spot, lat, lng, category: category.title })
      } else {
        missing.push(spot.id)
      }
    }
  }
  if (missing.length > 0) {
    console.warn(
      `[SpotsMap] no coordinates for: ${missing.join(', ')}. ` +
        `Run "npm run geocode" or set lat/lng/address in guide.json.`,
    )
  }
  return resolved
}

// Sage teardrop pin — divIcon so it renders as styled HTML/SVG, not
// the default blue marker PNG. Anchored at the tip.
const SAGE = '#688557'
const pinHtml = `
  <svg width="22" height="28" viewBox="0 0 22 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11 1C5.477 1 1 5.477 1 11c0 6.5 9 16 9.4 16.4a.85.85 0 0 0 1.2 0C12 27 21 17.5 21 11c0-5.523-4.477-10-10-10Z"
      fill="${SAGE}" stroke="white" stroke-width="1.5"/>
    <circle cx="11" cy="11" r="3.25" fill="white"/>
  </svg>
`
const spotIcon = L.divIcon({
  html: pinHtml,
  className: 'spots-map-pin',
  iconSize: [22, 28],
  iconAnchor: [11, 27],
  popupAnchor: [0, -22],
})

function FitToBounds({ spots }: { spots: ResolvedSpot[] }) {
  const map = useMap()
  useEffect(() => {
    if (spots.length === 0) return
    if (spots.length === 1) {
      map.setView([spots[0].lat, spots[0].lng], 14)
      return
    }
    const bounds = L.latLngBounds(spots.map((s) => [s.lat, s.lng]))
    map.fitBounds(bounds, { padding: [32, 32] })
  }, [map, spots])
  return null
}

interface SpotsMapProps {
  /** Preview mode: shorter, non-interactive (used as a thumbnail). */
  preview?: boolean
}

export function SpotsMap({ preview = false }: SpotsMapProps) {
  const spots = useMemo(resolveSpots, [])

  if (spots.length === 0) {
    return (
      <div className="rounded-cardLg border-hair border-warm-100 bg-card p-6 text-sm text-warm-700">
        No mappable spots yet — add an address or run{' '}
        <code className="font-mono">npm run geocode</code> to plot them.
      </div>
    )
  }

  // Center is set immediately by FitToBounds; this is just an initial value.
  const center: [number, number] = [spots[0].lat, spots[0].lng]

  const sizingClass = preview
    ? 'block w-full h-[240px]'
    : 'block w-full h-[calc(100vh-18rem)] min-h-[420px]'

  return (
    <div className="overflow-hidden rounded-cardLg border-hair border-warm-100">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={!preview}
        dragging={!preview}
        doubleClickZoom={!preview}
        touchZoom={!preview}
        zoomControl={!preview}
        attributionControl={!preview}
        className={sizingClass}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
          subdomains={['a', 'b', 'c', 'd']}
        />
        {spots.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]} icon={spotIcon}>
            <Popup>
              <div className="bg-card rounded-cardLg border-hair border-warm-100 p-3 max-w-[240px]">
                <p className="font-heading text-[16px] leading-tight text-ink">{s.name}</p>
                {s.town && (
                  <p className="font-body text-[12px] text-muted mt-0.5">{s.town}</p>
                )}
                <p className="font-body text-[13px] text-warm-700 mt-2 leading-snug">
                  {s.why}
                </p>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-block mt-2 text-sage text-[13px] font-medium"
                  >
                    Open
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        <FitToBounds spots={spots} />
      </MapContainer>
    </div>
  )
}
