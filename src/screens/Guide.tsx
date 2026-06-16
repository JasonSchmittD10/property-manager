import {
  welcomeNote,
  guide,
  essentials,
  community,
  seasonalTips,
  landlord,
  favoritesMap,
} from '../config/property'
import { Card } from '../components/Card'
import { Link } from 'react-router-dom'
import { ChevronRight, ExternalLink, Map } from 'lucide-react'

function isResolvedUrl(s: string | undefined): s is string {
  return !!s && /^https?:\/\//.test(s)
}

export default function Guide() {
  const populatedCategories = guide.filter((c) => c.spots.length > 0)

  return (
    <div className="px-4 space-y-6">
      <header className="pt-2">
        <h1 className="font-heading text-3xl">Guide</h1>
        <p className="text-muted text-sm">A few favorites from {landlord.name}.</p>
      </header>

      {/* Welcome */}
      <Card>
        <p className="text-xs uppercase tracking-widest text-muted">
          A note from {landlord.name}
        </p>
        <h2 className="font-heading text-2xl mt-2">{welcomeNote.heading}</h2>
        <div className="mt-3 space-y-3 text-ink/90">
          {welcomeNote.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-4 text-muted">{welcomeNote.signoff}</p>
      </Card>

      {/* Our favorite spots — full-screen map */}
      {favoritesMap.enabled && (
        <Link
          to="/guide/map"
          aria-label={favoritesMap.linkLabel}
          className="block"
        >
          <Card className="flex items-center gap-3">
            <Map size={20} className="text-sage" />
            <div className="flex-1">
              <p className="font-heading text-lg">{favoritesMap.linkLabel}</p>
              <p className="text-sm text-muted">Explore the map</p>
            </div>
            <ChevronRight size={18} className="text-sage" />
          </Card>
        </Link>
      )}

      {/* Neighborhood */}
      {populatedCategories.length > 0 && (
        <section>
          <h2 className="font-heading text-xl mb-3">Neighborhood</h2>
          <div className="space-y-5">
            {populatedCategories.map((cat) => (
              <div key={cat.id}>
                <p className="text-xs uppercase tracking-widest text-muted mb-2">{cat.title}</p>
                <div className="space-y-3">
                  {cat.spots.map((s) => (
                    <Card key={s.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-heading text-lg">{s.name}</p>
                          {s.town && <p className="text-xs text-muted">{s.town}</p>}
                          <p className="text-sm text-muted mt-1">{s.why}</p>
                        </div>
                        {isResolvedUrl(s.link) && (
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`Open ${s.name}`}
                            className="text-sage p-2"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Getting around / essentials */}
      <section>
        <h2 className="font-heading text-xl mb-3">Getting around</h2>
        <Card>
          <ul className="divide-y divide-border">
            {essentials.map((n) => (
              <li key={n.id} className="py-3">
                <p className="text-xs text-muted uppercase tracking-widest">{n.label}</p>
                <div className="flex items-center justify-between">
                  <p>{n.name}</p>
                  {isResolvedUrl(n.link) ? (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sage text-sm"
                    >
                      Open
                    </a>
                  ) : n.phone && n.phone !== 'TODO' ? (
                    <a
                      href={`tel:${n.phone.replace(/[^+\d]/g, '')}`}
                      className="text-sage text-sm"
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

      {/* Community (optional) */}
      {community.show && community.items.length > 0 && (
        <section>
          <h2 className="font-heading text-xl mb-3">{community.heading}</h2>
          <Card>
            <p className="text-sm text-muted">{community.intro}</p>
            <ul className="divide-y divide-border mt-3">
              {community.items.map((item) => (
                <li key={item.id} className="py-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{item.detail}</p>
                  {isResolvedUrl(item.link) && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-block mt-1 text-sage text-sm underline underline-offset-2"
                    >
                      Visit website
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Seasonal */}
      <section>
        <h2 className="font-heading text-xl mb-3">Seasonal tips</h2>
        <div className="space-y-3">
          {seasonalTips.map((t) => (
            <Card key={t.id}>
              <p className="font-heading text-lg">{t.title}</p>
              <p className="text-sm text-muted mt-1">{t.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
