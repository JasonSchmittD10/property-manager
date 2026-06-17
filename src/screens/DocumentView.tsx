import { Navigate, useParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
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
      <BackLink to="/property/documents">Documents</BackLink>

      <PageHeader title={doc.title} subtitle={doc.description} size="md" />

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
