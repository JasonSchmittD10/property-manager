import { Sheet } from './Sheet'
import { property } from '../config/property'
import { ContactRow } from './ContactRow'

interface Props {
  open: boolean
  onClose: () => void
}

export function EmergencySheet({ open, onClose }: Props) {
  const e = property.emergency
  return (
    <Sheet open={open} onClose={onClose} title="Emergency info">
      <p className="text-ink">
        For life-threatening emergencies, <strong>call 911 first.</strong>
      </p>
      <div className="space-y-4 mt-4">
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Water shut-off</h3>
          <p className="mt-1">{e.waterShutoffLocation}</p>
          {e.waterShutoffPhoto && (
            <img
              src={e.waterShutoffPhoto}
              alt="Water shut-off location"
              className="mt-2 rounded-card border-hair border-border"
            />
          )}
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Gas leak</h3>
          <p className="mt-1">{e.gasGuidance}</p>
          <ContactRow
            contact={{ kind: 'phone', value: e.gasEmergencyLine, label: 'Enbridge emergency line' }}
            title="Enbridge emergency line"
          />
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Breaker panel</h3>
          <p className="mt-1">{e.breakerPanelLocation}</p>
        </section>
        <section>
          <h3 className="text-sm uppercase tracking-widest text-muted">Landlord after-hours</h3>
          <p className="mt-1">{property.landlord.afterHoursNote}</p>
          <ContactRow
            contact={{ kind: 'phone', value: property.landlord.phone, label: property.landlord.names }}
            title={`Call ${property.landlord.names}`}
          />
        </section>
      </div>
    </Sheet>
  )
}
