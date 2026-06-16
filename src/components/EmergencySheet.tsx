import { Sheet } from './Sheet'
import { emergency, landlord } from '../config/property'
import { ContactRow } from './ContactRow'

interface Props {
  open: boolean
  onClose: () => void
}

export function EmergencySheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title="Emergency info">
      <p className="text-ink">
        <strong>{emergency.reminder}</strong>
      </p>
      <div className="space-y-4 mt-4">
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Water shut-off</h3>
          <p className="mt-1">{emergency.waterShutoff}</p>
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Gas leak</h3>
          <p className="mt-1">{emergency.gasLeak}</p>
          <ContactRow
            contact={{ kind: 'phone', value: '1-877-776-2427' }}
            title="Enbridge emergency line"
          />
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Breaker panel</h3>
          <p className="mt-1">{emergency.breakerPanel}</p>
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">After-hours contact</h3>
          <p className="mt-1">{emergency.afterHoursContact}</p>
          {landlord.contacts.map((c) => (
            <ContactRow
              key={c.name}
              contact={{ kind: 'phone', value: c.phone }}
              title={`Call ${c.name}`}
            />
          ))}
        </section>
      </div>
    </Sheet>
  )
}
