import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { BottomTabs } from './BottomTabs'
import Home from '../screens/Home'
import Property from '../screens/Property'
import Utilities from '../screens/Utilities'
import Documents from '../screens/Documents'
import HouseManual from '../screens/HouseManual'
import Guide from '../screens/Guide'
import GuideMap from '../screens/GuideMap'

// pdf.js is ~100KB gzipped. Code-split DocumentView so the cost only
// lands on tenants who actually open a PDF.
const DocumentView = lazy(() => import('../screens/DocumentView'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export function AppShell() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-canvas">
        <div className="max-w-md mx-auto pb-[120px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route path="/property/utilities" element={<Utilities />} />
            <Route path="/property/documents" element={<Documents />} />
            <Route
              path="/property/documents/:id"
              element={
                <Suspense fallback={null}>
                  <DocumentView />
                </Suspense>
              }
            />
            <Route path="/property/house-manual" element={<HouseManual />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/map" element={<GuideMap />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <BottomTabs />
      </div>
    </BrowserRouter>
  )
}
