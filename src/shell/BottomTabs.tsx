import { NavLink } from 'react-router-dom'
import {
  DashboardIcon,
  PropertyIcon,
  CityGuideIcon,
} from '../components/icons/NavIcons'

const tabs = [
  { to: '/', label: 'Dashboard', Icon: DashboardIcon, end: true },
  { to: '/property', label: 'Property', Icon: PropertyIcon, end: false },
  { to: '/guide', label: 'City Guide', Icon: CityGuideIcon, end: false },
] as const

export function BottomTabs() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-canvas border-t-hair border-border">
      <ul className="flex justify-around max-w-md mx-auto">
        {tabs.map(({ to, label, Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                [
                  // 75px per tab, top padding 12px, 4px gap between icon + label
                  'flex flex-col items-center gap-[4px] w-[75px] pt-[12px] pb-2',
                  // 1.5px sage top border on selected; transparent placeholder on default
                  // so the icon doesn't shift vertically when state changes.
                  'border-t-[1.5px] border-solid',
                  isActive ? 'text-sage border-sage' : 'text-muted border-transparent',
                ].join(' ')
              }
            >
              <Icon size={18} />
              <span
                className="font-heading text-[12px] leading-[14px] tracking-[0.36px] text-center whitespace-nowrap"
              >
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
