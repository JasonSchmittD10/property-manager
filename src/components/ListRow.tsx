import type { ComponentType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconChip } from './IconChip'
import { CaratDownIcon } from './icons/Icons'

/**
 * Standard row with leading icon-chip + label (+ optional sub) + trailing
 * chevron. Used by Property "Setup & documents" rows, Guide "The
 * Neighborhood" row, and similar.
 *
 * Behavior:
 *  - `to`: react-router Link (internal navigation)
 *  - `href`: anchor (external link — opens in new tab if `external`)
 *  - `onClick`: button (in-app action like opening a sheet)
 *  - none: static <div> (no interaction)
 */
interface IconCmpProps {
  size?: number
  className?: string
}

type ListRowProps = {
  Icon: ComponentType<IconCmpProps>
  label: ReactNode
  /** Trailing element on the right; defaults to a right-pointing chevron. */
  trailing?: ReactNode
  className?: string
} & (
  | { to: string; href?: never; external?: never; onClick?: never }
  | { href: string; external?: boolean; to?: never; onClick?: never }
  | { onClick: () => void; to?: never; href?: never; external?: never }
  | { to?: never; href?: never; onClick?: never }
)

const ROW_CLASS = 'w-full flex items-center gap-2.5 text-left min-h-[44px]'
const DEFAULT_TRAILING = (
  <CaratDownIcon size={16} className="-rotate-90 text-warm-500" />
)

export function ListRow(props: ListRowProps) {
  const { Icon, label, trailing = DEFAULT_TRAILING, className = '' } = props
  const cls = `${ROW_CLASS} ${className}`.trim()
  const content = (
    <>
      <IconChip Icon={Icon} />
      <span className="flex-1 text-label text-ink">{label}</span>
      {trailing}
    </>
  )
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {content}
      </Link>
    )
  }
  if ('href' in props && props.href) {
    const external = props.external
    return (
      <a
        href={props.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className={cls}
      >
        {content}
      </a>
    )
  }
  if ('onClick' in props && props.onClick) {
    return (
      <button type="button" onClick={props.onClick} className={cls}>
        {content}
      </button>
    )
  }
  return <div className={cls}>{content}</div>
}
