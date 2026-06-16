import { useState } from 'react'
import { Link } from 'react-router-dom'
import { property, rent, quickInfo } from '../config/property'
import { formatMoney, nextDueDateLabel } from '../lib/format'
import {
  PowerIcon,
  DocumentIcon,
  BookBookmarkIcon,
  HistoryIcon,
  CaratDownIcon,
} from '../components/icons/Icons'
import { HouseManualSheet } from '../components/HouseManualSheet'

export default function Property() {
  const [manualOpen, setManualOpen] = useState(false)
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const total = rent.baseRent + rent.internetCharge

  return (
    <div className="px-6 pt-6 pb-8 space-y-7">
      {/* Header */}
      <header>
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-sage">
          Your home
        </p>
        <h1 className="font-heading text-[36px] leading-none text-ink mt-1">
          {property.name}
        </h1>
        <p className="font-body font-medium text-[14px] text-warm-700 mt-1">
          {property.address}, {property.cityStateZip}
        </p>
      </header>

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
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
          Setup & documents
        </p>
        <div className="bg-card border-hair border-warm-100 rounded-cardLg p-4 space-y-4">
          <SetupRow Icon={PowerIcon} label="Utilities" to="/property/utilities" />
          <Divider />
          <SetupRow Icon={DocumentIcon} label="Documents" to="/property/documents" />
          <Divider />
          <SetupRow
            Icon={BookBookmarkIcon}
            label="House Manual"
            onClick={() => setManualOpen(true)}
          />
        </div>
      </section>

      <HouseManualSheet open={manualOpen} onClose={() => setManualOpen(false)} />
    </div>
  )
}

// ----------------------------------------------------------------------
// Quick info card — wifi password + front door code in inset tiles
// ----------------------------------------------------------------------

function QuickInfoCard() {
  return (
    <div className="bg-card border-hair border-warm-100 rounded-cardLg p-4 space-y-2.5">
      <h2 className="font-heading text-[20px] leading-none text-ink">Quick info</h2>
      <InfoTile
        eyebrow="WIFI PASSWORD"
        value={quickInfo.wifiPassword}
        sub={`Network · ${quickInfo.wifiNetwork}`}
      />
      <InfoTile eyebrow="FRONT DOOR CODE" value={quickInfo.frontDoorCode} />
    </div>
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
    <div className="bg-warm-card rounded-cardInner p-3">
      <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
        {eyebrow}
      </p>
      <p className="font-heading text-[16px] leading-none text-ink mt-1">{value}</p>
      {sub && (
        <p className="font-body font-medium text-[12px] text-warm-700 mt-1">{sub}</p>
      )}
    </div>
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
    <div className="bg-card border-hair border-warm-100 rounded-cardLg p-4 space-y-4">
      <div>
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-warm-500">
          Rent
        </p>
        <p className="font-heading text-[32px] leading-none text-ink mt-1">
          {formatMoney(total)}
        </p>
        <p className="font-body font-medium text-[12px] text-warm-700 mt-2">
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
        <span className="font-heading text-[14px] tracking-[0.14px] text-ink">
          View breakdown
        </span>
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

      <div className="flex gap-2.5">
        <a
          href={rent.paymentLink}
          target="_blank"
          rel="noreferrer noopener"
          className="flex-1 bg-sage text-white rounded-cardInner px-4 py-3 font-heading text-[18px] tracking-[0.05em] text-center min-h-[47px] flex items-center justify-center active:bg-sage-deep active:scale-[0.98] transition"
        >
          Pay Rent
        </a>
        <button
          type="button"
          aria-label="Payment history"
          title="Payment history (coming soon)"
          className="bg-card border-hair border-warm-100 rounded-cardInner px-4 py-3 min-h-[47px] flex items-center justify-center text-warm-500"
        >
          <HistoryIcon size={20} />
        </button>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Setup & Documents row — icon chip + label + right chevron
// ----------------------------------------------------------------------

type SetupRowProps = {
  Icon: typeof PowerIcon
  label: string
} & ({ to: string; onClick?: never } | { onClick: () => void; to?: never })

function SetupRow(props: SetupRowProps) {
  const { Icon, label } = props
  const content = (
    <>
      <span className="bg-sage-tint rounded-cardInner w-9 h-9 flex items-center justify-center text-sage shrink-0">
        <Icon size={20} />
      </span>
      <span className="flex-1 font-heading text-[16px] leading-[20px] text-ink">{label}</span>
      <CaratDownIcon size={16} className="-rotate-90 text-warm-500" />
    </>
  )
  const rowClass = 'w-full flex items-center gap-2.5 text-left min-h-[44px]'
  return props.to ? (
    <Link to={props.to} className={rowClass}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={props.onClick} className={rowClass}>
      {content}
    </button>
  )
}

function Divider() {
  return <div className="h-px bg-warm-50" />
}
