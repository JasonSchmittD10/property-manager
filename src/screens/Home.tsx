import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import {
  TrashFilledIcon,
  XCloseIcon,
  SubscriptionIcon,
  ScreenReaderIcon,
  WifiArcsIcon,
  type IconComponent,
} from '../components/icons/Icons'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { IconChip } from '../components/IconChip'
import {
  property,
  rent,
  quickInfo,
  maintenance,
  verses,
  verseFallback,
} from '../config/property'
import { nextDueDateLabel } from '../lib/format'

// Figma 4:392 — Home dashboard. Dynamic eyebrow/greeting, dismissable trash
// reminder, 2x2 action chips, hero photo, verse of the day. Detailed
// property info lives on the Property tab; this is the at-a-glance view.

function todayEyebrow(now: Date = new Date()): string {
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const month = now.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  return `${weekday}, ${month} ${now.getDate()}`
}

function greeting(now: Date = new Date()): string {
  const hour = now.getHours()
  if (hour < 12) return "Good morning, Y'all"
  if (hour < 17) return "Good afternoon, Y'all"
  return "Good evening, Y'all"
}

// Returns true if tomorrow matches the configured trash collection day.
function isTrashDayTomorrow(now: Date = new Date()): boolean {
  const match = quickInfo.trashDay.match(
    /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/i,
  )
  if (!match) return false
  const trashWeekday = match[0].toLowerCase()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const tomorrowWeekday = tomorrow
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase()
  return tomorrowWeekday === trashWeekday
}

// Day-of-year (1..366) in local time — used to pick today's verse so the
// rotation is stable for the day and changes at local midnight.
// Adapter so lucide's <Users /> satisfies our stricter IconComponent contract
// (size: number, not string | number). Used on the Nextdoor action chip.
function NeighborhoodIcon({ size = 20, className }: { size?: number; className?: string }) {
  return <Users size={size} className={className} />
}

function dayOfYear(now: Date = new Date()): number {
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000)
}

function todayReference(): string {
  if (verses.length === 0) return verseFallback[0]?.reference ?? 'Micah 6:8'
  return verses[dayOfYear() % verses.length]
}

function fallbackFor(reference: string): { reference: string; text: string } {
  return (
    verseFallback.find((v) => v.reference === reference) ??
    verseFallback[0] ?? {
      reference: 'Micah 6:8',
      text:
        "He hath showed thee, O man, what is good; and what doth Jehovah require of thee, but to do justly, and to love kindness, and to walk humbly with thy God?",
    }
  )
}

// Pulls today's verse text live from bible-api.com (ASV — keyless, public
// domain). Initial state is the local ASV fallback, so the card never
// flashes empty: it shows a real verse immediately, then swaps in the
// fetched text when it arrives. Any failure (offline, API down, bad
// shape) silently keeps the fallback. Mirrors useWifiStatus.
function useVerseOfTheDay() {
  const ref = todayReference()
  const [verse, setVerse] = useState(fallbackFor(ref))
  useEffect(() => {
    let cancelled = false
    const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=asv`
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return
        if (data && typeof data.text === 'string' && typeof data.reference === 'string') {
          setVerse({ reference: data.reference, text: data.text.trim() })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [ref])
  return verse
}

// Reads the /api/wifi-outage edge function on mount. Defaults to "no outage"
// so a dev (no /api routes) or network failure never shows a scary state.
function useWifiStatus() {
  const [status, setStatus] = useState<{ outage: boolean; message: string }>({
    outage: false,
    message: 'No current outages.',
  })
  useEffect(() => {
    let cancelled = false
    fetch('/api/wifi-outage')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.message) {
          setStatus({ outage: !!data.outage, message: data.message })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  return status
}

export default function Home() {
  const [trashDismissed, setTrashDismissed] = useState(false)
  const showTrash = !trashDismissed && isTrashDayTomorrow()
  const wifi = useWifiStatus()
  const verse = useVerseOfTheDay()

  return (
    <div className="px-6 pt-12 pb-8 space-y-7">
      {/* Header — eyebrow / h1 / subtitle stack tight, line-height does the work.
          Stays inline (not PageHeader) because the Figma Home layout uses
          tight mt-0 spacing between the three lines. */}
      <header>
        <Eyebrow>{todayEyebrow()}</Eyebrow>
        <h1 className="text-h1 text-ink">{greeting()}</h1>
        <p className="text-body text-warm-700">It's a beautiful day to be in Raleigh!</p>
      </header>

      {/* Card column — 16px gap between trash card, chip grid, verse card, hero. */}
      <div className="space-y-4">
        {/* Trash day reminder */}
        {showTrash && (
          <Card className="relative">
            <button
              type="button"
              onClick={() => setTrashDismissed(true)}
              aria-label="Dismiss"
              className="absolute top-3 right-3 text-warm-600 p-1 min-h-[28px] min-w-[28px] flex items-center justify-center"
            >
              <XCloseIcon size={20} />
            </button>
            <TrashFilledIcon size={24} className="text-ink" />
            <p className="text-label text-ink mt-2">Tomorrow is Trash Day!</p>
            <p className="text-caption text-warm-700 mt-2.5">
              Trash usually comes by 7am, be sure to get those cans out the night before.
            </p>
          </Card>
        )}

        {/* Action chips — 2x2 */}
        <div className="grid grid-cols-2 gap-2">
          <ActionChip
            Icon={SubscriptionIcon}
            title="Pay Rent"
            sub={nextDueDateLabel(rent.dueDayOfMonth)}
            to="/property"
          />
          <ActionChip
            Icon={ScreenReaderIcon}
            title="Report a Problem"
            sub="Let us know of any issues!"
            href={maintenance.contactMethod}
          />
          <ActionChip
            Icon={WifiArcsIcon}
            title="Wifi"
            sub={wifi.message}
            to="/property"
          />
          <ActionChip
            Icon={NeighborhoodIcon}
            title="Nextdoor"
            sub="Check on the community."
            href="https://nextdoor.com/neighborhood/huntersrun--raleigh--nc/"
            external
          />
        </div>

        {/* Verse of the day */}
        <Card>
          <Eyebrow tone="subdued">Verse of the day</Eyebrow>
          <p className="text-label text-ink mt-2">{verse.reference} ASV</p>
          <p className="text-caption text-warm-700 mt-2.5 leading-snug">{verse.text}</p>
        </Card>

        {/* Hero photo */}
        {property.heroPhoto && (
          <div className="aspect-[4/3] rounded-cardLg overflow-hidden">
            <img
              src={property.heroPhoto}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Action chip — sage-tint icon chip + Cal Sans label + warm-700 sub.
// ----------------------------------------------------------------------

type ActionChipProps = {
  Icon: IconComponent
  title: string
  sub: string
} & (
  | { to: string; href?: never; external?: never }
  | { href: string; to?: never; external?: boolean }
)

function ActionChip(props: ActionChipProps) {
  const { Icon, title, sub } = props
  // Icons sized to match Figma: most chips use 20px; wifi uses 18px because
  // its viewBox is shorter (the arcs would otherwise overflow the tile).
  const iconSize = Icon === WifiArcsIcon ? 18 : 20
  const inner = (
    <>
      <IconChip Icon={Icon} size={iconSize} />
      <span className="block text-label text-ink mt-2.5">{title}</span>
      <span className="block text-caption text-warm-700 mt-1">{sub}</span>
    </>
  )
  const cls =
    'bg-card border-hair border-warm-100 rounded-cardLg p-4 flex flex-col items-start'

  if (props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    )
  }
  const external = props.external
  return (
    <a
      href={props.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className={cls}
    >
      {inner}
    </a>
  )
}
