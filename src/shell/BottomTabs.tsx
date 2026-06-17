import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  NavMainIcon,
  NavPropertyIcon,
  NavGuideIcon,
  WarningSignIcon,
} from '../components/icons/Icons'
import { EmergencySheet } from '../components/EmergencySheet'

// Floating pill bottom nav — Figma 1:1406 + atom 1:1332.
// On top-level routes a circular Emergency button sits alongside the pill
// (Figma 1:1359). On child pages the Emergency button is hidden so the
// back link stays the primary affordance, and the pill centers.

const TOP_LEVEL_ROUTES = new Set(['/', '/property', '/guide'])

const tabs = [
  { to: '/', label: 'Main', Icon: NavMainIcon, end: true },
  { to: '/property', label: 'Property', Icon: NavPropertyIcon, end: false },
  { to: '/guide', label: 'Guide', Icon: NavGuideIcon, end: false },
] as const

// "BIG shadow" lives in tailwind.config.js as drop-shadow-big.
const CHIP_BASE =
  'bg-card border border-muted/20 drop-shadow-big'

export function BottomTabs() {
  const { pathname } = useLocation()
  const showEmergency = TOP_LEVEL_ROUTES.has(pathname)
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
      >
        <div className="max-w-md mx-auto px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div
            className={[
              'flex items-center gap-4 pointer-events-auto',
              showEmergency ? 'justify-between' : 'justify-center',
            ].join(' ')}
          >
            {/* Pill */}
            <ul
              className={[
                CHIP_BASE,
                'flex items-center justify-between',
                'rounded-[24px] px-[30px] py-[12px]',
                'w-[287px] max-w-full',
              ].join(' ')}
            >
              {tabs.map(({ to, label, Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    aria-label={label}
                    className={({ isActive }) =>
                      [
                        'flex flex-col items-center gap-[7px]',
                        isActive ? 'text-sage-600' : 'text-muted',
                      ].join(' ')
                    }
                  >
                    <Icon size={20} />
                    <span className="font-heading text-[10px] leading-[14px] tracking-[0.3px] text-center">
                      {label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Emergency circle */}
            {showEmergency && (
              <button
                type="button"
                onClick={() => setEmergencyOpen(true)}
                aria-label="Open emergency info"
                className={[
                  CHIP_BASE,
                  'rounded-[24px] size-[65px] shrink-0',
                  'flex items-center justify-center text-danger',
                ].join(' ')}
              >
                <WarningSignIcon size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>
      <EmergencySheet open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  )
}
