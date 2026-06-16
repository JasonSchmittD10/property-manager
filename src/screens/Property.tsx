import {
  property,
  rent,
  utilities,
  documents,
  houseManual,
  trashRecycling,
  landlord,
  appAccess,
} from '../config/property'
import { Card } from '../components/Card'
import { ContactRow } from '../components/ContactRow'
import { formatMoney } from '../lib/format'
import { FileText, Zap, Flame, Droplet, Wifi as WifiIcon, Trash2 } from 'lucide-react'

const utilityIcon: Record<string, typeof Zap> = {
  electric: Zap,
  gas: Flame,
  water: Droplet,
  internet: WifiIcon,
}

export default function Property() {
  const totalRent = rent.baseRent + rent.internetCharge

  return (
    <div className="px-4 space-y-6">
      <header className="pt-2">
        <h1 className="font-heading text-3xl">Property</h1>
        <p className="text-muted text-sm">Everything about the house and your tenancy.</p>
      </header>

      {/* Utilities */}
      <section>
        <h2 className="font-heading text-xl mb-3">Utilities</h2>
        <div className="space-y-3">
          {utilities.map((u) => {
            const Icon = utilityIcon[u.id] ?? Zap
            const isLandlordProvided = u.setupBy === 'landlord'
            return (
              <Card key={u.id}>
                <div className="flex items-start gap-3">
                  <span className="bg-sage-tint text-sage-deep p-2 rounded-full">
                    <Icon size={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted uppercase tracking-widest">{u.category}</p>
                    <p className="font-heading text-lg">{u.name}</p>
                    {u.note && <p className="text-sm text-muted mt-1">{u.note}</p>}
                    {!isLandlordProvided && (
                      <div className="mt-2">
                        {u.phone && (
                          <ContactRow
                            contact={{ kind: 'phone', value: u.phone }}
                            title="Call to set up"
                          />
                        )}
                        {u.email && (
                          <ContactRow
                            contact={{ kind: 'email', value: u.email }}
                            title={u.email}
                          />
                        )}
                        {u.link && (
                          <ContactRow
                            contact={{ kind: 'url', value: u.link, label: 'Set up service' }}
                            title="Set up online"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Documents */}
      <section>
        <h2 className="font-heading text-xl mb-3">Documents</h2>
        <Card>
          <ul className="divide-y divide-border">
            {documents.map((d) => {
              const ready = d.file.length > 0
              return (
                <li key={d.id}>
                  {ready ? (
                    <a
                      href={d.file}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 py-3 min-h-[44px]"
                    >
                      <FileText size={16} className="text-sage" />
                      <span className="flex-1">
                        <span className="block">{d.title}</span>
                        {d.description && (
                          <span className="block text-muted text-xs">{d.description}</span>
                        )}
                      </span>
                      <span className="text-muted text-xs">View</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 py-3 min-h-[44px] text-muted">
                      <FileText size={16} />
                      <span className="flex-1">
                        <span className="block">{d.title}</span>
                        {d.description && (
                          <span className="block text-xs">{d.description}</span>
                        )}
                      </span>
                      <span className="text-xs">Coming soon</span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      {/* House manual */}
      <section>
        <h2 className="font-heading text-xl mb-3">House manual</h2>
        <div className="space-y-3">
          {houseManual.map((m) => (
            <Card key={m.id}>
              <h3 className="font-heading text-lg">{m.title}</h3>
              {m.photo && (
                <img
                  src={m.photo}
                  alt={m.title}
                  className="rounded-card border-hair border-border my-3"
                />
              )}
              <div className="space-y-2 mt-2 text-sm text-ink/90">
                {m.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trash & recycling */}
      <section>
        <h2 className="font-heading text-xl mb-3">Trash & recycling</h2>
        <Card>
          <div className="flex items-start gap-3">
            <Trash2 size={16} className="text-sage mt-1" />
            <div className="flex-1 text-sm">
              <p>
                Collection: <strong>{trashRecycling.collectionDay}</strong>
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-muted">
                {trashRecycling.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              {trashRecycling.bulkyPickupNote && (
                <p className="mt-3 text-muted">{trashRecycling.bulkyPickupNote}</p>
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
      </section>

      {/* Rent details */}
      <section>
        <h2 className="font-heading text-xl mb-3">Rent & payment details</h2>
        <Card>
          <p className="text-sm">
            Total monthly rent: <strong>{formatMoney(totalRent)}</strong>
          </p>
          <p className="text-sm text-muted mt-1">
            Base {formatMoney(rent.baseRent)} + {formatMoney(rent.internetCharge)} internet. Due
            the {rent.dueDay}.
          </p>
          {rent.autoPayNote && (
            <p className="text-sm text-muted mt-3">{rent.autoPayNote}</p>
          )}
          <p className="text-sm text-muted mt-3">{rent.latePolicy}</p>
          <a
            href={rent.paymentLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block mt-3 text-sage underline underline-offset-2"
          >
            {rent.paymentLabel}
          </a>
        </Card>
      </section>

      {/* Lease & contact */}
      <section>
        <h2 className="font-heading text-xl mb-3">Lease & contact</h2>
        <Card>
          <p className="text-sm">
            Lease term: <strong>{property.leaseStart}</strong> –{' '}
            <strong>{property.leaseEnd}</strong>
          </p>
          <div className="mt-3 space-y-3">
            <p className="text-xs text-muted uppercase tracking-widest">{landlord.name}</p>
            {landlord.contacts.map((c) => (
              <div key={c.name}>
                <p className="font-medium">{c.name}</p>
                <ContactRow contact={{ kind: 'phone', value: c.phone }} title="Call" />
                <ContactRow contact={{ kind: 'sms', value: c.phone }} title="Text" />
                <ContactRow contact={{ kind: 'email', value: c.email }} title={c.email} />
              </div>
            ))}
            <div className="text-sm text-muted">
              <p>Preferred: {landlord.preferredContact}</p>
              <p>Response: {landlord.responseExpectation}</p>
            </div>
          </div>
          <div className="mt-4 border-t-hair border-border pt-3">
            <p className="text-xs text-muted uppercase tracking-widest">App login (for reference)</p>
            <p className="text-sm">
              Username: <strong>{appAccess.username}</strong>
            </p>
            <p className="text-sm">
              Password: <strong>{appAccess.password}</strong>
            </p>
            <p className="text-xs text-muted mt-1">{appAccess.note}</p>
          </div>
        </Card>
      </section>
    </div>
  )
}
