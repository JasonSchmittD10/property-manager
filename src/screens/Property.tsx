import { property } from '../config/property'
import { Card } from '../components/Card'
import { ContactRow } from '../components/ContactRow'
import { formatMoney, formatDate, ordinal } from '../lib/format'
import { FileText, Zap, Flame, Droplet, Wifi as WifiIcon, Trash2 } from 'lucide-react'

const utilityIcon: Record<string, typeof Zap> = {
  electric: Zap,
  gas: Flame,
  water: Droplet,
  internet: WifiIcon,
}

export default function Property() {
  const { utilities, documents, manual, trash, rent, lease, landlord, sharedLogin } = property
  const totalRent = rent.baseAmount + rent.internetAmount

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
            return (
              <Card key={u.id}>
                <div className="flex items-start gap-3">
                  <span className="bg-sage-tint text-sage-deep p-2 rounded-full">
                    <Icon size={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted uppercase tracking-widest">{u.service}</p>
                    <p className="font-heading text-lg">{u.provider}</p>
                    {u.note && <p className="text-sm text-muted mt-1">{u.note}</p>}
                    {u.providedByLandlord ? null : (
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
                        {u.url && (
                          <ContactRow
                            contact={{ kind: 'url', value: u.url, label: 'Set up service' }}
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
            {documents.map((d) => (
              <li key={d.id}>
                <a
                  href={d.file}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 py-3 min-h-[44px]"
                >
                  <FileText size={16} className="text-sage" />
                  <span className="flex-1">{d.title}</span>
                  <span className="text-muted text-xs">View</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* House manual */}
      <section>
        <h2 className="font-heading text-xl mb-3">House manual</h2>
        <div className="space-y-3">
          {manual.map((m) => (
            <Card key={m.id}>
              <h3 className="font-heading text-lg">{m.title}</h3>
              {m.photo && (
                <img
                  src={m.photo}
                  alt={m.title}
                  className="rounded-card border-hair border-border my-3"
                />
              )}
              <p className="text-sm whitespace-pre-line text-ink/90">{m.body}</p>
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
                Garbage: <strong>{trash.garbageDay}</strong>
              </p>
              <p>
                Recycling: <strong>{trash.recyclingDay}</strong> ({trash.recyclingCadence})
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside text-muted">
                {trash.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
              <a
                href={trash.scheduleLookupUrl}
                target="_blank"
                rel="noreferrer"
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
            Base {formatMoney(rent.baseAmount)} + {formatMoney(rent.internetAmount)} internet. Due
            the {ordinal(rent.dueDayOfMonth)} of each month.
          </p>
          <p className="text-sm text-muted mt-3">{rent.latePolicy}</p>
          <a
            href={rent.paymentLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sage underline underline-offset-2"
          >
            How payment works
          </a>
        </Card>
      </section>

      {/* Lease & contact */}
      <section>
        <h2 className="font-heading text-xl mb-3">Lease & contact</h2>
        <Card>
          <p className="text-sm">
            Lease term: <strong>{formatDate(lease.startDate)}</strong> –{' '}
            <strong>{formatDate(lease.endDate)}</strong>
          </p>
          <div className="mt-3">
            <p className="text-xs text-muted uppercase tracking-widest">Landlord</p>
            <p className="font-medium">{landlord.names}</p>
            <ContactRow contact={{ kind: 'phone', value: landlord.phone }} title="Call" />
            <ContactRow contact={{ kind: 'email', value: landlord.email }} title="Email" />
          </div>
          <div className="mt-3 border-t-hair border-border pt-3">
            <p className="text-xs text-muted uppercase tracking-widest">App login (for reference)</p>
            <p className="text-sm">
              Username: <strong>{sharedLogin.username}</strong>
            </p>
            <p className="text-sm">
              Password: <strong>{sharedLogin.password}</strong>
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}
