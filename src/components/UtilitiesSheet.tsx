import { Sheet } from './Sheet'
import { ContactRow } from './ContactRow'
import { utilities } from '../config/property'

interface Props {
  open: boolean
  onClose: () => void
}

export function UtilitiesSheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title="Utilities">
      <p className="text-warm-400 text-sm mb-4">
        Set up utilities in your name effective on your lease start date. Internet is
        provided by the landlord and included in rent.
      </p>
      <div className="space-y-4">
        {utilities.map((u) => (
          <section key={u.id} className="border-hair border-warm-100 rounded-cardInner p-4">
            <p className="text-warm-500 text-xs font-body font-bold tracking-eyebrow uppercase">
              {u.category}
            </p>
            <p className="font-heading text-lg mt-1">{u.name}</p>
            {u.note && <p className="text-sm text-warm-400 mt-2">{u.note}</p>}
            {u.setupBy === 'tenant' && (
              <div className="mt-2">
                {u.phone && (
                  <ContactRow contact={{ kind: 'phone', value: u.phone }} title="Call to set up" />
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
    </Sheet>
  )
}
