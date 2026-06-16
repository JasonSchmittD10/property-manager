import { Sheet } from './Sheet'
import { houseManual, trashRecycling } from '../config/property'
import { Trash2 } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

export function HouseManualSheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title="House manual">
      <div className="space-y-4">
        {houseManual.map((m) => (
          <section
            key={m.id}
            className="border-hair border-warm-100 rounded-cardInner p-4"
          >
            <h3 className="font-heading text-lg">{m.title}</h3>
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
          </section>
        ))}
      </div>

      <section className="mt-6">
        <h3 className="font-heading text-lg mb-2">Trash & recycling</h3>
        <div className="border-hair border-warm-100 rounded-cardInner p-4">
          <div className="flex items-start gap-3">
            <Trash2 size={16} className="text-sage mt-1" />
            <div className="flex-1 text-sm">
              <p>
                Collection: <span className="font-medium">{trashRecycling.collectionDay}</span>
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-warm-400">
                {trashRecycling.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              {trashRecycling.bulkyPickupNote && (
                <p className="mt-3 text-warm-400">{trashRecycling.bulkyPickupNote}</p>
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
        </div>
      </section>
    </Sheet>
  )
}
