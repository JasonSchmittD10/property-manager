import { NavLink } from 'react-router-dom'
import { Home as HomeIcon, House, Compass } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/property', label: 'Property', icon: House, end: false },
  { to: '/guide', label: 'Guide', icon: Compass, end: false },
]

export function BottomTabs() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-canvas border-t-hair border-border">
      <ul className="flex max-w-md mx-auto">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-1 py-2 text-xs',
                  isActive ? 'text-sage' : 'text-muted',
                ].join(' ')
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
