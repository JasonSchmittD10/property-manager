import { property } from '../config/property'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ContactRow } from '../components/ContactRow'
import { CopyField } from '../components/CopyField'
import { formatMoney, ordinal, formatDate } from '../lib/format'
import { Wifi, Trash2, Wrench } from 'lucide-react'

export default function Home() {
  const { rent, wifi, trash, maintenanceContact, landlord, announcements, heroPhoto, address } =
    property
  const total = rent.baseAmount + rent.internetAmount

  return (
    <div className="px-4 space-y-4">
      {/* Hero */}
      <div className="rounded-hero overflow-hidden border-hair border-border bg-surface">
        {heroPhoto ? (
          <img src={heroPhoto} alt="Bashford" className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-sage-tint" aria-hidden />
        )}
        <div className="p-5 bg-card">
          <p className="text-xs tracking-widest text-muted uppercase">Welcome to</p>
          <h1 className="font-heading text-3xl mt-1">Bashford</h1>
          <p className="text-muted mt-1">
            {address.line1} · {address.cityStateZip}
          </p>
        </div>
      </div>

      {/* Rent */}
      <Card>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-muted uppercase tracking-widest">Rent</p>
            <p className="font-heading text-3xl mt-1">{formatMoney(total)}</p>
            <p className="text-muted text-sm mt-1">
              Due the {ordinal(rent.dueDayOfMonth)} · includes {formatMoney(rent.internetAmount)} internet
            </p>
          </div>
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
        <CopyField label="Network" value={wifi.ssid} />
        <CopyField label="Password" value={wifi.password} />
        <div className="flex items-start gap-2 pt-3 border-t-hair border-border mt-2">
          <Trash2 size={16} className="text-sage mt-1" />
          <p className="text-sm">
            Garbage: {trash.garbageDay} · Recycling: {trash.recyclingDay} ({trash.recyclingCadence})
          </p>
        </div>
      </Card>

      {/* Report a problem */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Wrench size={16} className="text-sage" />
          <h2 className="font-heading text-lg">Something not working?</h2>
        </div>
        <p className="text-muted text-sm">Let us know — we will sort it out.</p>
        <ContactRow
          contact={maintenanceContact}
          title={maintenanceContact.label ?? 'Reach maintenance'}
        />
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

      {/* Quick contact */}
      <Card>
        <h2 className="font-heading text-lg">Reach {landlord.names}</h2>
        <ContactRow
          contact={{ kind: 'phone', value: landlord.phone, label: 'Call' }}
          title="Call"
        />
        <ContactRow
          contact={{ kind: 'sms', value: landlord.phone, label: 'Text' }}
          title="Text"
        />
        <ContactRow
          contact={{ kind: 'email', value: landlord.email, label: landlord.email }}
          title="Email"
        />
      </Card>
    </div>
  )
}
