import type { ReactNode } from 'react'

/**
 * Section eyebrow — the small uppercase Hanken-Bold label above a
 * section H1/H2. Two tones:
 *  - `accent` (default): sage-600. Use on page headers above the H1.
 *  - `subdued`: warm-500. Use inside cards / on lower-emphasis sections.
 *
 * Color is the only thing that varies — size/weight/tracking are fixed.
 */
export function Eyebrow({
  tone = 'accent',
  className = '',
  children,
}: {
  tone?: 'accent' | 'subdued'
  className?: string
  children: ReactNode
}) {
  const color = tone === 'accent' ? 'text-sage-600' : 'text-warm-500'
  return <p className={`text-eyebrow ${color} ${className}`}>{children}</p>
}
