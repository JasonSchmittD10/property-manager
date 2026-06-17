import { Link } from 'react-router-dom'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { houseManual, trashRecycling } from '../config/property'

export default function HouseManual() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <Link
        to="/property"
        className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
      >
        <ChevronLeft size={16} />
        Property
      </Link>

      <header>
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-sage-600">
          The basics
        </p>
        <h1 className="font-heading text-[36px] leading-none text-ink mt-1">
          House manual
        </h1>
      </header>

      <div className="space-y-4">
        {houseManual.map((m) => (
          <section
            key={m.id}
            className="bg-card border-hair border-warm-100 rounded-cardLg p-4"
          >
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
          </section>
        ))}

        <section className="bg-card border-hair border-warm-100 rounded-cardLg p-4">
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
        </section>
      </div>
    </div>
  )
}
