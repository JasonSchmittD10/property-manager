import { Link } from 'react-router-dom'
import { ChevronLeft, FileText } from 'lucide-react'
import { ContactRow } from '../components/ContactRow'
import { documents, property, landlord, appAccess } from '../config/property'

export default function Documents() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <Link
        to="/property"
        className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
      >
        <ChevronLeft size={16} />
        Property
      </Link>

      <header>
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-sage">
          Tenant info
        </p>
        <h1 className="font-heading text-[36px] leading-none text-ink mt-1">Documents</h1>
      </header>

      {/* Files */}
      <section>
        <h2 className="font-heading text-[20px] leading-none text-ink mb-3">Files</h2>
        <div className="bg-card border-hair border-warm-200 rounded-cardLg">
          <ul className="divide-y divide-warm-100">
            {documents.map((d) => {
              const ready = d.file.length > 0
              return (
                <li key={d.id}>
                  {ready ? (
                    <a
                      href={d.file}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 px-4 py-3 min-h-[52px]"
                    >
                      <FileText size={16} className="text-sage" />
                      <span className="flex-1">
                        <span className="block">{d.title}</span>
                        {d.description && (
                          <span className="block text-warm-400 text-xs">{d.description}</span>
                        )}
                      </span>
                      <span className="text-warm-500 text-xs">View</span>
                    </a>
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
        </div>
      </section>

      {/* Lease term */}
      <section>
        <h2 className="font-heading text-[20px] leading-none text-ink mb-3">Lease term</h2>
        <div className="bg-card border-hair border-warm-200 rounded-cardLg p-4 text-sm">
          <p>
            Start: <span className="font-medium">{property.leaseStart}</span>
          </p>
          <p className="mt-1">
            End: <span className="font-medium">{property.leaseEnd}</span>
          </p>
        </div>
      </section>

      {/* Landlord */}
      <section>
        <h2 className="font-heading text-[20px] leading-none text-ink mb-3">Landlord</h2>
        <div className="bg-card border-hair border-warm-200 rounded-cardLg p-4 space-y-4">
          <p className="text-sm text-warm-400">{landlord.name}</p>
          {landlord.contacts.map((c) => (
            <div key={c.name}>
              <p className="text-xs text-warm-500 uppercase tracking-eyebrow font-body font-bold">
                {c.name}
              </p>
              <ContactRow contact={{ kind: 'phone', value: c.phone }} title="Call" />
              <ContactRow contact={{ kind: 'sms', value: c.phone }} title="Text" />
              <ContactRow contact={{ kind: 'email', value: c.email }} title={c.email} />
            </div>
          ))}
        </div>
      </section>

      {/* App login */}
      <section>
        <h2 className="font-heading text-[20px] leading-none text-ink mb-3">App login</h2>
        <div className="bg-card border-hair border-warm-200 rounded-cardLg p-4 text-sm">
          <p>
            Username: <span className="font-medium">{appAccess.username}</span>
          </p>
          <p className="mt-1">
            Password: <span className="font-medium">{appAccess.password}</span>
          </p>
          <p className="text-xs text-warm-400 mt-2">{appAccess.note}</p>
        </div>
      </section>
    </div>
  )
}
