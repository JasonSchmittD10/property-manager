import { Link, Navigate, useParams } from 'react-router-dom'
import { X, ExternalLink } from 'lucide-react'
import { documents } from '../config/property'

// Full-screen PDF viewer. The iframe fills the viewport (no page padding
// or back-link bar above it) so the browser's native PDF viewer can size
// the doc to the screen instead of scaling down to fit inside a small
// embed — that was the "weirdly zoomed in" UX from the previous version.
//
// Close affordances:
//  - Sticky X in the top-right corner (small floating chip).
//  - "Open in new tab" link in the top-left for tenants who want the
//    browser's own PDF chrome (download / share / etc.).
export default function DocumentView() {
  const { id } = useParams<{ id: string }>()
  const doc = documents.find((d) => d.id === id)

  // Unknown id or file not uploaded yet → bounce back to the list.
  if (!doc || !doc.file) {
    return <Navigate to="/property/documents" replace />
  }

  return (
    <div className="fixed inset-0 z-50 bg-canvas">
      <iframe
        src={doc.file}
        title={doc.title}
        className="block w-full h-full border-0"
      />

      {/* Floating close chip — top right */}
      <Link
        to="/property/documents"
        aria-label="Close document"
        className="absolute top-[max(12px,env(safe-area-inset-top))] right-3 size-11 rounded-full bg-card border-hair border-warm-200 drop-shadow-big flex items-center justify-center text-ink active:scale-95 transition"
      >
        <X size={20} />
      </Link>

      {/* Open-in-new-tab chip — top left */}
      <a
        href={doc.file}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Open in new tab"
        className="absolute top-[max(12px,env(safe-area-inset-top))] left-3 h-11 px-3 rounded-full bg-card border-hair border-warm-200 drop-shadow-big flex items-center gap-1.5 text-sage text-sm font-medium active:scale-95 transition"
      >
        <ExternalLink size={16} />
        New tab
      </a>
    </div>
  )
}
