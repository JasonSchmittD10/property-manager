import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { BottomTabs } from './BottomTabs'
import { EmergencyButton } from './EmergencyButton'
import Home from '../screens/Home'
import Property from '../screens/Property'
import Utilities from '../screens/Utilities'
import Documents from '../screens/Documents'
import Guide from '../screens/Guide'

// Routes where the persistent Emergency button shows. Child routes
// (e.g. /property/utilities) hide it so the back link is the primary
// affordance.
const TOP_LEVEL_ROUTES = new Set(['/', '/property', '/guide'])

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function TopBar() {
  const { pathname } = useLocation()
  if (!TOP_LEVEL_ROUTES.has(pathname)) return null
  return (
    <div className="px-4 pt-3 flex justify-end">
      <EmergencyButton />
    </div>
  )
}

export function AppShell() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-canvas">
        <div className="max-w-md mx-auto pb-24">
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route path="/property/utilities" element={<Utilities />} />
            <Route path="/property/documents" element={<Documents />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <BottomTabs />
      </div>
    </BrowserRouter>
  )
}
