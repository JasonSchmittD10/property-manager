import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BottomTabs } from './BottomTabs'
import { EmergencyButton } from './EmergencyButton'
import Home from '../screens/Home'
import Property from '../screens/Property'
import Guide from '../screens/Guide'

export function AppShell() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas">
        <div className="max-w-md mx-auto pb-24">
          <div className="px-4 pt-3 flex justify-end">
            <EmergencyButton />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <BottomTabs />
      </div>
    </BrowserRouter>
  )
}
