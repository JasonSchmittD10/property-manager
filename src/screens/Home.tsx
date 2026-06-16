import {
  property,
  rent,
  quickInfo,
  maintenance,
  landlord,
  announcements,
} from '../config/property'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ContactRow } from '../components/ContactRow'
import { CopyField } from '../components/CopyField'
import { formatMoney, formatDate } from '../lib/format'
import { Wifi, Trash2, Wrench } from 'lucide-react'

export default function Home() {
  const total = rent.baseRent + rent.internetCharge

  return (
    <div className="px-4 space-y-4">
      {/* Hero */}
      <div className="rounded-hero overflow-hidden border-hair border-border bg-surface">
        {property.heroPhoto ? (
          <img
            src={property.heroPhoto}
            alt={property.name}
            className="w-full h-44 object-cover"
            onError={(e) => {
              // Hide broken image so the warm sage-tint fallback shows through.
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-44 bg-sage-tint" aria-hidden />
        )}
        <div className="p-5 bg-card">
          <p className="text-xs tracking-widest text-muted uppercase">Welcome to</p>
          <h1 className="font-heading text-3xl mt-1">{property.name}</h1>
          <p className="text-muted mt-1">
            {property.address} · {property.cityStateZip}
          </p>
        </div>
      </div>

      {/* Rent */}
      <Card>
        <div>
          <p className="text-xs text-muted uppercase tracking-widest">Rent</p>
          <p className="font-heading text-3xl mt-1">{formatMoney(total)}</p>
          <p className="text-muted text-sm mt-1">
            Due the {rent.dueDay} · includes {formatMoney(rent.internetCharge)} internet
          </p>
        </div>
        <Button
          fullWidth
          className="mt-4"
          onClick={() => window.open(rent.paymentLink, '_blank', 'noopener')}
        >
          {rent.paymentLabel}
        </Button>
      </Card>

      {/* Quick info: wifi + trash */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Wifi size={16} className="text-sage" />
          <h2 className="font-heading text-lg">Wifi & trash</h2>
        </div>
        <CopyField label="Network" value={quickInfo.wifiNetwork} />
        <CopyField label="Password" value={quickInfo.wifiPassword} />
        <div className="flex items-start gap-2 pt-3 border-t-hair border-border mt-2">
          <Trash2 size={16} className="text-sage mt-1" />
          <div className="text-sm flex-1">
            <p>Trash: {quickInfo.trashDay}</p>
            <p className="text-muted mt-1">{quickInfo.recyclingNote}</p>
          </div>
        </div>
      </Card>

      {/* Report a problem */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Wrench size={16} className="text-sage" />
          <h2 className="font-heading text-lg">Something not working?</h2>
        </div>
        <p className="text-muted text-sm">{maintenance.blurb}</p>
        <ContactRow
          contact={{ kind: 'url', value: maintenance.contactMethod, label: 'Report a problem' }}
          title="Report a problem"
        />
        <p className="text-muted text-xs mt-1">{maintenance.emergencyReminder}</p>
      </Card>

      {/* Announcements */}
      <Card>
        <h2 className="font-heading text-lg">Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-muted text-sm mt-2">All quiet — nothing new from us right now.</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {announcements.map((a) => (
              <li key={a.id}>
                <p className="text-xs text-muted uppercase tracking-widest">{formatDate(a.date)}</p>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Quick contact — both landlords */}
      <Card>
        <h2 className="font-heading text-lg">Reach {landlord.name}</h2>
        {landlord.contacts.map((c) => (
          <div key={c.name} className="mt-2 first:mt-1">
            <p className="text-xs text-muted uppercase tracking-widest">{c.name}</p>
            <ContactRow
              contact={{ kind: 'phone', value: c.phone, label: 'Call' }}
              title="Call"
            />
            <ContactRow
              contact={{ kind: 'sms', value: c.phone, label: 'Text' }}
              title="Text"
            />
            <ContactRow
              contact={{ kind: 'email', value: c.email, label: c.email }}
              title="Email"
            />
          </div>
        ))}
      </Card>
    </div>
  )
}
