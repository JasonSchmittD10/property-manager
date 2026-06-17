import { Trash2 } from 'lucide-react'
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { houseManual, trashRecycling } from '../config/property'

export default function HouseManual() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <BackLink to="/property">Property</BackLink>

      <PageHeader eyebrow="The basics" title="House manual" />

      <div className="space-y-4">
        {houseManual.map((m) => (
          <Card as="section" key={m.id}>
            <h2 className="font-heading text-lg text-ink">{m.title}</h2>
            {m.photo && (
              <img
                src={m.photo}
                alt={m.title}
                className="rounded-cardInner border-hair border-warm-100 my-3"
              />
            )}
            <div className="space-y-2 mt-2 text-sm text-ink/90">
              {m.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Card>
        ))}

        <Card as="section">
          <h2 className="font-heading text-lg text-ink mb-2">Trash & recycling</h2>
          <div className="flex items-start gap-3">
            <Trash2 size={16} className="text-sage mt-1" />
            <div className="flex-1 text-sm">
              <p>
                Collection:{' '}
                <span className="font-medium">{trashRecycling.collectionDay}</span>
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-warm-700">
                {trashRecycling.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              {trashRecycling.bulkyPickupNote && (
                <p className="mt-3 text-warm-700">{trashRecycling.bulkyPickupNote}</p>
              )}
              <a
                href={trashRecycling.reuseToolLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block mt-3 text-sage underline underline-offset-2"
              >
                Look up your schedule on raleighnc.gov
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
