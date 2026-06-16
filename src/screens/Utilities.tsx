import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ContactRow } from '../components/ContactRow'
import { utilities } from '../config/property'

export default function Utilities() {
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
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-sage">
          Setup
        </p>
        <h1 className="font-heading text-[36px] leading-none text-ink mt-1">Utilities</h1>
        <p className="font-body font-medium text-[14px] text-warm-400 mt-2">
          Set up utilities in your name effective on your lease start date. Internet is
          provided by the landlord and included in rent.
        </p>
      </header>

      <div className="space-y-4">
        {utilities.map((u) => (
          <section
            key={u.id}
            className="bg-card border-hair border-warm-200 rounded-cardLg p-4"
          >
            <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
              {u.category}
            </p>
            <p className="font-heading text-lg text-ink mt-1">{u.name}</p>
            {u.note && <p className="text-sm text-warm-400 mt-2">{u.note}</p>}
            {u.setupBy === 'tenant' && (
              <div className="mt-2">
                {u.phone && (
                  <ContactRow
                    contact={{ kind: 'phone', value: u.phone }}
                    title="Call to set up"
                  />
                )}
                {u.email && (
                  <ContactRow contact={{ kind: 'email', value: u.email }} title={u.email} />
                )}
                {u.link && (
                  <ContactRow
                    contact={{ kind: 'url', value: u.link, label: 'Set up online' }}
                    title="Set up online"
                  />
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
