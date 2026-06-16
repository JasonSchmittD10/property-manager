import { Sheet } from './Sheet'
import { ContactRow } from './ContactRow'
import { documents, property, landlord, appAccess } from '../config/property'
import { FileText } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

export function DocumentsSheet({ open, onClose }: Props) {
  return (
    <Sheet open={open} onClose={onClose} title="Documents">
      <section>
        <h3 className="font-heading text-lg mb-2">Files</h3>
        <ul className="divide-y divide-warm-100 border-hair border-warm-100 rounded-cardInner">
          {documents.map((d) => {
            const ready = d.file.length > 0
            return (
              <li key={d.id}>
                {ready ? (
                  <a
                    href={d.file}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 px-3 py-3 min-h-[44px]"
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
                  <div className="flex items-center gap-3 px-3 py-3 min-h-[44px] text-warm-500">
                    <FileText size={16} />
                    <span className="flex-1">
                      <span className="block">{d.title}</span>
                      {d.description && <span className="block text-xs">{d.description}</span>}
                    </span>
                    <span className="text-xs">Coming soon</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="font-heading text-lg mb-2">Lease term</h3>
        <p className="text-sm">
          <span className="block">
            Start: <span className="font-medium">{property.leaseStart}</span>
          </span>
          <span className="block mt-1">
            End: <span className="font-medium">{property.leaseEnd}</span>
          </span>
        </p>
      </section>

      <section className="mt-6">
        <h3 className="font-heading text-lg mb-2">Landlord</h3>
        <p className="text-sm text-warm-400 mb-2">{landlord.name}</p>
        {landlord.contacts.map((c) => (
          <div key={c.name} className="mt-3 first:mt-0">
            <p className="text-xs text-warm-500 uppercase tracking-eyebrow font-body font-bold">
              {c.name}
            </p>
            <ContactRow contact={{ kind: 'phone', value: c.phone }} title="Call" />
            <ContactRow contact={{ kind: 'sms', value: c.phone }} title="Text" />
            <ContactRow contact={{ kind: 'email', value: c.email }} title={c.email} />
          </div>
        ))}
      </section>

      <section className="mt-6 border-t-hair border-warm-100 pt-4">
        <h3 className="font-heading text-lg mb-2">App login</h3>
        <p className="text-sm">
          Username: <span className="font-medium">{appAccess.username}</span>
        </p>
        <p className="text-sm">
          Password: <span className="font-medium">{appAccess.password}</span>
        </p>
        <p className="text-xs text-warm-400 mt-1">{appAccess.note}</p>
      </section>
    </Sheet>
  )
}
