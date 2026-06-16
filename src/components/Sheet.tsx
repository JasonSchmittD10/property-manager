import { useEffect } from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Sheet({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end justify-center"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30"
      />
      <div className="relative w-full max-w-md bg-canvas rounded-t-hero p-6 max-h-[85vh] overflow-y-auto border-t-hair border-border">
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-heading text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-surface"
            aria-label="Close sheet"
          >
            <X size={18} className="text-muted" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
