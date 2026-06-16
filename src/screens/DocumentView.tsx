import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import { documents } from '../config/property'

export default function DocumentView() {
  const { id } = useParams<{ id: string }>()
  const doc = documents.find((d) => d.id === id)

  // Unknown id or file not uploaded yet → bounce back to the list.
  if (!doc || !doc.file) {
    return <Navigate to="/property/documents" replace />
  }

  return (
    <div className="px-6 pt-4 pb-8 space-y-4">
      <Link
        to="/property/documents"
        className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
      >
        <ChevronLeft size={16} />
        Documents
      </Link>

      <header>
        <h1 className="font-heading text-[28px] leading-none text-ink">{doc.title}</h1>
        {doc.description && (
          <p className="font-body font-medium text-[14px] text-warm-700 mt-1">
            {doc.description}
          </p>
        )}
      </header>

      <div className="overflow-hidden rounded-cardLg border-hair border-warm-100 bg-card">
        <iframe
          src={doc.file}
          title={doc.title}
          className="block w-full h-[calc(100vh-22rem)] min-h-[480px] border-0"
        />
      </div>

      <a
        href={doc.file}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
      >
        Open in new tab
        <ExternalLink size={14} />
      </a>
    </div>
  )
}
