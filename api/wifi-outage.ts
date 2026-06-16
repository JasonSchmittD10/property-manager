// Vercel Edge function — checks Google Fiber's status page for outages
// affecting the Raleigh area and returns a tiny JSON the Home dashboard
// reads. Cached at the edge for 5 minutes (with SWR fallback) so the
// tenant app never hammers gfiber.com.
//
// Fail-safe: any upstream or parse error returns { outage: false } so a
// network hiccup never shows a scary "outage" state to the tenant.

export const config = { runtime: 'edge' }

const SOURCE = 'https://gfiber.com/outage/service-available/'
const NO_OUTAGE_MARKER = 'no outage found'

interface OutageStatus {
  outage: boolean
  message: string
  checkedAt: string
  source: string
}

function json(body: OutageStatus, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      ...(init.headers ?? {}),
    },
  })
}

export default async function handler(): Promise<Response> {
  try {
    const upstream = await fetch(SOURCE, {
      headers: { 'User-Agent': 'BashfordTenantApp/0.1 (status-probe)' },
    })
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`)
    const html = (await upstream.text()).toLowerCase()
    const noOutage = html.includes(NO_OUTAGE_MARKER)
    return json({
      outage: !noOutage,
      message: noOutage
        ? 'No current outages.'
        : 'Possible outage — check gfiber.com.',
      checkedAt: new Date().toISOString(),
      source: SOURCE,
    })
  } catch {
    return json({
      outage: false,
      message: 'No current outages.',
      checkedAt: new Date().toISOString(),
      source: SOURCE,
    })
  }
}
