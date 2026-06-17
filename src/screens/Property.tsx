import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { ListRow } from '../components/ListRow'
import { property, rent, quickInfo } from '../config/property'
import { formatMoney, nextDueDateLabel } from '../lib/format'
import {
  PowerIcon,
  DocumentIcon,
  BookBookmarkIcon,
  HistoryIcon,
  CaratDownIcon,
} from '../components/icons/Icons'

export default function Property() {
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const total = rent.baseRent + rent.internetCharge

  return (
    <div className="px-6 pt-12 pb-8 space-y-7">
      <PageHeader
        eyebrow="Your home"
        title={property.name}
        subtitle={`${property.address}, ${property.cityStateZip}`}
      />

      {/* Cards: Quick info + Rent */}
      <section className="space-y-4">
        <QuickInfoCard />
        <RentCard
          total={total}
          breakdownOpen={breakdownOpen}
          onToggleBreakdown={() => setBreakdownOpen((v) => !v)}
        />
      </section>

      {/* Setup & Documents */}
      <section className="space-y-4">
        <Eyebrow tone="subdued">Setup &amp; documents</Eyebrow>
        <Card className="space-y-4">
          <ListRow Icon={PowerIcon} label="Utilities" to="/property/utilities" />
          <Divider />
          <ListRow Icon={DocumentIcon} label="Documents" to="/property/documents" />
          <Divider />
          <ListRow Icon={BookBookmarkIcon} label="House Manual" to="/property/house-manual" />
        </Card>
      </section>
    </div>
  )
}

// ----------------------------------------------------------------------
// Quick info card — wifi password + front door code in inset tiles
// ----------------------------------------------------------------------

function QuickInfoCard() {
  return (
    <Card className="space-y-2.5">
      <h2 className="font-heading text-[20px] leading-none text-ink">Quick info</h2>
      <InfoTile
        eyebrow="WIFI PASSWORD"
        value={quickInfo.wifiPassword}
        sub={`Network · ${quickInfo.wifiNetwork}`}
      />
      <InfoTile eyebrow="FRONT DOOR CODE" value={quickInfo.frontDoorCode} />
    </Card>
  )
}

function InfoTile({
  eyebrow,
  value,
  sub,
}: {
  eyebrow: string
  value: string
  sub?: string
}) {
  return (
    <Card variant="inset">
      <Eyebrow tone="subdued">{eyebrow}</Eyebrow>
      <p className="font-heading text-[16px] leading-none text-ink mt-1">{value}</p>
      {sub && (
        <p className="font-body font-medium text-[12px] text-warm-700 mt-1">{sub}</p>
      )}
    </Card>
  )
}

// ----------------------------------------------------------------------
// Rent card — total, due date, View breakdown collapse, Pay Rent + history
// ----------------------------------------------------------------------

function RentCard({
  total,
  breakdownOpen,
  onToggleBreakdown,
}: {
  total: number
  breakdownOpen: boolean
  onToggleBreakdown: () => void
}) {
  return (
    <Card className="space-y-4">
      <div>
        <Eyebrow tone="subdued">Rent</Eyebrow>
        <p className="text-money text-ink mt-1">{formatMoney(total)}</p>
        <p className="text-caption text-warm-700 mt-2">
          {nextDueDateLabel(rent.dueDayOfMonth)}
        </p>
      </div>

      <Divider />

      <button
        type="button"
        onClick={onToggleBreakdown}
        aria-expanded={breakdownOpen}
        className="w-full flex items-center justify-between min-h-[28px] text-left"
      >
        <span className="text-button-md text-ink">View breakdown</span>
        <CaratDownIcon
          size={16}
          className={[
            'text-warm-500 transition-transform',
            breakdownOpen ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {breakdownOpen && (
        <div className="text-sm text-warm-700 space-y-1.5 -mt-2">
          <div className="flex justify-between">
            <span>Base rent</span>
            <span className="text-ink">{formatMoney(rent.baseRent)}</span>
          </div>
          <div className="flex justify-between">
            <span>Internet (Google Fiber)</span>
            <span className="text-ink">{formatMoney(rent.internetCharge)}</span>
          </div>
          <div className="flex justify-between border-t-hair border-warm-100 pt-1.5 mt-1.5">
            <span>Total · {rent.dueDay}</span>
            <span className="text-ink font-medium">{formatMoney(total)}</span>
          </div>
          <p className="pt-2">{rent.autoPayNote}</p>
          <p>{rent.latePolicy}</p>
        </div>
      )}

      <PayWithZelle />
    </Card>
  )
}

// ----------------------------------------------------------------------
// Pay with Zelle — copy the landlord's Zelle handle, then the tenant
// pastes it into their bank's Zelle screen. Zelle has no deep-link.
// ----------------------------------------------------------------------

function PayWithZelle() {
  const [copied, setCopied] = useState(false)
  // Track the reset timer so we can cancel it if the component unmounts
  // before it fires — avoids a setState-on-unmounted warning.
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(rent.paymentRecipient)
      setCopied(true)
      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available — leave button idle */
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="flex-1 bg-sage text-white rounded-cardInner px-4 py-3 text-button-lg text-center min-h-[47px] flex items-center justify-center gap-2 active:bg-sage-deep active:scale-[0.98] transition"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy Zelle email
            </>
          )}
        </button>
        <button
          type="button"
          aria-label="Payment history"
          title="Payment history (coming soon)"
          className="bg-card border-hair border-warm-100 rounded-cardInner px-4 py-3 min-h-[47px] flex items-center justify-center text-warm-500"
        >
          <HistoryIcon size={20} />
        </button>
      </div>
      <p className="text-caption text-warm-700">
        Sends to <span className="text-ink">{rent.paymentRecipient}</span> via Zelle.{' '}
        {rent.paymentInstructions}
      </p>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-warm-50" />
}
