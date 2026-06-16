import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { landlord, favoritesMap, welcomeNote, essentials } from '../config/property'
import { PowerIcon } from '../components/icons/Icons'
import { SpotsMap } from '../components/SpotsMap'

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
      <header>
        <h1 className="font-heading text-[36px] leading-none text-ink">Your Guide</h1>
        <p className="font-body font-medium text-[14px] text-warm-700 mt-1">
          A few favorites from {landlord.name}.
        </p>
      </header>

      {favoritesMap.enabled && (
        <section className="space-y-4">
          <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
            Our recommendations
          </p>

          <Link to="/guide/map" aria-label="Open the favorite-spots map" className="block">
            <SpotsMap preview />
          </Link>

          <Link
            to="/guide/map"
            className="bg-card border-hair border-warm-100 rounded-cardLg p-4 flex items-center gap-3"
          >
            <span className="bg-sage-tint rounded-cardInner w-9 h-9 flex items-center justify-center text-sage shrink-0">
              <PowerIcon size={20} />
            </span>
            <span className="flex-1 font-heading text-[16px] leading-tight text-ink">
              The Neighborhood
            </span>
            <ChevronRight size={16} className="text-warm-500" />
          </Link>
        </section>
      )}

      {/* A note from Jason & Abby */}
      <section className="bg-card border-hair border-warm-100 rounded-cardLg p-4 space-y-3">
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
          A note from {landlord.name}
        </p>
        <h2 className="font-heading text-[20px] leading-tight text-ink">
          {welcomeNote.heading}
        </h2>
        <div className="space-y-2 text-sm text-ink/90">
          {welcomeNote.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p className="text-warm-700 text-sm">{welcomeNote.signoff}</p>
      </section>

      {/* Getting around */}
      {essentials.length > 0 && (
        <section className="space-y-4">
          <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
            Getting around
          </p>
          <div className="bg-card border-hair border-warm-100 rounded-cardLg">
            <ul className="divide-y divide-warm-100">
              {essentials.map((n) => (
                <li key={n.id} className="px-4 py-3">
                  <p className="text-xs text-warm-500 uppercase tracking-eyebrow font-body font-bold">
                    {n.label}
                  </p>
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
          </div>
        </section>
      )}
    </div>
  )
}
