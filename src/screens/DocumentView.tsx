import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { X, ExternalLink } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { documents } from '../config/property'

// Renders PDFs with Mozilla pdf.js (via react-pdf) instead of an
// <iframe>. Pages are explicitly sized to the container width so iOS
// Safari can't decide to render at native 612px and overflow the
// screen — every page snaps to the viewport, no horizontal scroll.
//
// The pdf.js worker is bundled by Vite via the ?url import; it loads
// on-demand only when this screen mounts.

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

export default function DocumentView() {
  const { id } = useParams<{ id: string }>()
  const doc = documents.find((d) => d.id === id)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [width, setWidth] = useState<number | null>(null)

  // Track the container's pixel width so each Page can render at exactly
  // viewport width (no horizontal scroll, no zoom-to-fit guesswork).
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setWidth(Math.floor(w))
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Unknown id or file not uploaded yet → bounce back to the list.
  if (!doc || !doc.file) {
    return <Navigate to="/property/documents" replace />
  }

  return (
    <div className="fixed inset-0 z-50 bg-canvas overflow-y-auto">
      <div ref={containerRef} className="w-full">
        <Document
          file={doc.file}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading={
            <div className="px-6 py-24 text-center text-warm-700 text-body">
              Loading {doc.title}…
            </div>
          }
          error={
            <div className="px-6 py-24 text-center text-warm-700 text-body">
              Couldn't load this PDF.{' '}
              <a
                href={doc.file}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sage font-medium"
              >
                Open in new tab
              </a>
              .
            </div>
          }
        >
          {width != null &&
            Array.from({ length: pageCount }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={width}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="mb-2 last:mb-0"
              />
            ))}
        </Document>
      </div>

      {/* Floating close chip — top right */}
      <Link
        to="/property/documents"
        aria-label="Close document"
        className="fixed top-[max(12px,env(safe-area-inset-top))] right-3 size-11 rounded-full bg-card border-hair border-warm-200 drop-shadow-big flex items-center justify-center text-ink active:scale-95 transition"
      >
        <X size={20} />
      </Link>

      {/* Open-in-new-tab chip — top left */}
      <a
        href={doc.file}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Open in new tab"
        className="fixed top-[max(12px,env(safe-area-inset-top))] left-3 h-11 px-3 rounded-full bg-card border-hair border-warm-200 drop-shadow-big flex items-center gap-1.5 text-sage text-sm font-medium active:scale-95 transition"
      >
        <ExternalLink size={16} />
        New tab
      </a>
    </div>
  )
}
