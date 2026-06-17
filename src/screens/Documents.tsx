import { Link } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'
import { ContactRow } from '../components/ContactRow'
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { documents, property, landlord, appAccess } from '../config/property'

export default function Documents() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <BackLink to="/property">Property</BackLink>

      <PageHeader eyebrow="Tenant info" title="Documents" />

      {/* Files */}
      <section>
        <h2 className="text-h2 text-ink mb-3">Files</h2>
        <Card noPadding>
          <ul className="divide-y divide-warm-100">
            {documents.map((d) => {
              const ready = d.file.length > 0
              return (
                <li key={d.id}>
                  {ready ? (
                    <Link
                      to={`/property/documents/${d.id}`}
                      className="flex items-center gap-3 px-4 py-3 min-h-[52px]"
                    >
                      <FileText size={16} className="text-sage" />
                      <span className="flex-1">
                        <span className="block">{d.title}</span>
                        {d.description && (
                          <span className="block text-warm-700 text-xs">{d.description}</span>
                        )}
                      </span>
                      <ChevronRight size={16} className="text-warm-500" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 min-h-[52px] text-warm-500">
                      <FileText size={16} />
                      <span className="flex-1">
                        <span className="block">{d.title}</span>
                        {d.description && (
                          <span className="block text-xs">{d.description}</span>
                        )}
                      </span>
                      <span className="text-xs">Coming soon</span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      {/* Lease term */}
      <section>
        <h2 className="text-h2 text-ink mb-3">Lease term</h2>
        <Card className="text-sm">
          <p>
            Start: <span className="font-medium">{property.leaseStart}</span>
          </p>
          <p className="mt-1">
            End: <span className="font-medium">{property.leaseEnd}</span>
          </p>
        </Card>
      </section>

      {/* Landlord */}
      <section>
        <h2 className="text-h2 text-ink mb-3">Landlord</h2>
        <Card className="space-y-4">
          <p className="text-sm text-warm-700">{landlord.name}</p>
          {landlord.contacts.map((c) => (
            <div key={c.name}>
              <Eyebrow tone="subdued">{c.name}</Eyebrow>
              <ContactRow contact={{ kind: 'phone', value: c.phone }} title="Call" />
              <ContactRow contact={{ kind: 'sms', value: c.phone }} title="Text" />
              <ContactRow contact={{ kind: 'email', value: c.email }} title={c.email} />
            </div>
          ))}
        </Card>
      </section>

      {/* App login */}
      <section>
        <h2 className="text-h2 text-ink mb-3">App login</h2>
        <Card className="text-sm">
          <p>
            Username: <span className="font-medium">{appAccess.username}</span>
          </p>
          <p className="mt-1">
            Password: <span className="font-medium">{appAccess.password}</span>
          </p>
          <p className="text-xs text-warm-700 mt-2">{appAccess.note}</p>
        </Card>
      </section>
    </div>
  )
}
