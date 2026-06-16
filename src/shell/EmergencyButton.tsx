import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { EmergencySheet } from '../components/EmergencySheet'

export function EmergencyButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-danger bg-card border-hair border-border rounded-pill px-3 py-2 min-h-[36px]"
        aria-label="Open emergency info"
      >
        <AlertTriangle size={14} />
        Emergency
      </button>
      <EmergencySheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}
