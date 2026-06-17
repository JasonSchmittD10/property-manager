import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { IconChip } from '../components/IconChip'
import { SpotsMap } from '../components/SpotsMap'
import { PowerIcon } from '../components/icons/Icons'
import { landlord, favoritesMap, welcomeNote, essentials } from '../config/property'

// Figma 9:410 — Guide. Header + map preview + "The Neighborhood" row that
// opens the full map. Welcome note and essentials live below the fold for
// tenants who scroll. Detailed category lists were dropped — pins on the
// map serve that purpose now.

function isResolvedUrl(s: string | undefined): s is string {
  return !!s && /^https?:\/\//.test(s)
}

export default function Guide() {
  return (
    <div className="px-6 pt-12 pb-8 space-y-7">
      <PageHeader title="Your Guide" subtitle={`A few favorites from ${landlord.name}.`} />

      {favoritesMap.enabled && (
        <section className="space-y-4">
          <Eyebrow tone="subdued">Our recommendations</Eyebrow>

          <Link to="/guide/map" aria-label="Open the favorite-spots map" className="block">
            <SpotsMap preview />
          </Link>

          <Link
            to="/guide/map"
            className="bg-card border-hair border-warm-100 rounded-cardLg p-4 flex items-center gap-3"
          >
            <IconChip Icon={PowerIcon} />
            <span className="flex-1 text-label text-ink">The Neighborhood</span>
            <ChevronRight size={16} className="text-warm-500" />
          </Link>
        </section>
      )}

      {/* A note from Jason & Abby */}
      <Card as="section" className="space-y-3">
        <Eyebrow tone="subdued">A note from {landlord.name}</Eyebrow>
        <h2 className="text-h2 text-ink">{welcomeNote.heading}</h2>
        <div className="space-y-2 text-sm text-ink/90">
          {welcomeNote.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p className="text-warm-700 text-sm">{welcomeNote.signoff}</p>
      </Card>

      {/* Getting around */}
      {essentials.length > 0 && (
        <section className="space-y-4">
          <Eyebrow tone="subdued">Getting around</Eyebrow>
          <Card noPadding>
            <ul className="divide-y divide-warm-100">
              {essentials.map((n) => (
                <li key={n.id} className="px-4 py-3">
                  <Eyebrow tone="subdued">{n.label}</Eyebrow>
                  <div className="flex items-center justify-between mt-1">
                    <p className="font-heading text-[16px] text-ink">{n.name}</p>
                    {isResolvedUrl(n.link) ? (
                      <a
                        href={n.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sage text-sm font-medium"
                      >
                        Open
                      </a>
                    ) : n.phone && !n.phone.startsWith('TODO') ? (
                      <a
                        href={`tel:${n.phone.replace(/[^+\d]/g, '')}`}
                        className="text-sage text-sm font-medium"
                      >
                        Call
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}
    </div>
  )
}
