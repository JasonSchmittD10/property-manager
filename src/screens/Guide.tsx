import { property } from '../config/property'
import { Card } from '../components/Card'
import { ExternalLink } from 'lucide-react'

export default function Guide() {
  const { welcomeNote, guide, seasonalTips, landlord } = property

  const grouped = guide.spots.reduce<Record<string, typeof guide.spots>>((acc, s) => {
    acc[s.category] = acc[s.category] ?? []
    acc[s.category]!.push(s)
    return acc
  }, {})

  return (
    <div className="px-4 space-y-6">
      <header className="pt-2">
        <h1 className="font-heading text-3xl">Guide</h1>
        <p className="text-muted text-sm">A few favorites from {landlord.names}.</p>
      </header>

      {/* Welcome */}
      <Card>
        <p className="text-xs uppercase tracking-widest text-muted">A note from {landlord.names}</p>
        <p className="mt-2 whitespace-pre-line">{welcomeNote}</p>
      </Card>

      {/* Neighborhood */}
      <section>
        <h2 className="font-heading text-xl mb-3">Neighborhood</h2>
        <div className="space-y-5">
          {Object.entries(grouped).map(([cat, spots]) => (
            <div key={cat}>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">{cat}</p>
              <div className="space-y-3">
                {spots.map((s) => (
                  <Card key={s.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-heading text-lg">{s.name}</p>
                        {s.town && <p className="text-xs text-muted">{s.town}</p>}
                        <p className="text-sm text-muted mt-1">{s.why}</p>
                      </div>
                      {s.url && (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
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

      {/* Getting around */}
      <section>
        <h2 className="font-heading text-xl mb-3">Getting around</h2>
        <Card>
          <ul className="divide-y divide-border">
            {guide.nearby.map((n) => (
              <li key={n.id} className="py-3">
                <p className="text-xs text-muted uppercase tracking-widest">{n.label}</p>
                <div className="flex items-center justify-between">
                  <p>{n.name}</p>
                  {n.url && (
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sage text-sm"
                    >
                      Open
                    </a>
                  )}
                  {n.phone && !n.url && (
                    <a
                      href={`tel:${n.phone.replace(/[^+\d]/g, '')}`}
                      className="text-sage text-sm"
                    >
                      Call
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Community (optional) */}
      {guide.communityNote && (
        <section>
          <h2 className="font-heading text-xl mb-3">Community</h2>
          <Card>
            <p className="whitespace-pre-line">{guide.communityNote}</p>
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
