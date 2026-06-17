import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Standard back link — chevron + label, sage. Always min-h 44px for
 * a comfortable tap target. Sits at the top of child screens before
 * the page header.
 *
 * Usage:
 *   <BackLink to="/property">Property</BackLink>
 */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
    >
      <ChevronLeft size={16} />
      {children}
    </Link>
  )
}
