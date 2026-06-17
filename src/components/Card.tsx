import { type HTMLAttributes } from 'react'

/**
 * Standard surface card — white bg, hairline border, 18px radius, 16px
 * padding. The single visual primitive every other component sits on.
 *
 * Variants:
 *  - `default`: white card (bg-card, border-warm-100, rounded-cardLg).
 *  - `inset`: smaller warm-toned tile used inside a default card
 *    (Quick info password tile etc.) — no border, smaller radius.
 *
 * Pass `as="section"` to render a semantic <section> instead of a <div>.
 * `noPadding` strips the default p-4 for cases like the Documents list
 * where the inner <ul> manages its own padding via divide-y.
 */
type Variant = 'default' | 'inset'

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  noPadding?: boolean
  as?: 'div' | 'section'
}

const STYLES: Record<Variant, string> = {
  default: 'bg-card border-hair border-warm-100 rounded-cardLg',
  inset: 'bg-warm-card rounded-cardInner',
}

export function Card({
  variant = 'default',
  noPadding = false,
  as = 'div',
  className = '',
  ...rest
}: Props) {
  const Tag = as
  const cls = [
    STYLES[variant],
    noPadding ? '' : variant === 'inset' ? 'p-3' : 'p-4',
    className,
  ]
    .join(' ')
    .trim()
  return <Tag className={cls} {...rest} />
}
