import { Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react'
import type { ContactLink } from '../config/property'

const ICON = {
  phone: Phone,
  email: Mail,
  sms: MessageSquare,
  url: ExternalLink,
} as const

function hrefFor(c: ContactLink): string {
  switch (c.kind) {
    case 'phone':
      return `tel:${c.value.replace(/[^+\d]/g, '')}`
    case 'sms':
      return `sms:${c.value.replace(/[^+\d]/g, '')}`
    case 'email':
      return `mailto:${c.value}`
    case 'url':
      return c.value
  }
}

interface Props {
  contact: ContactLink
  title?: string
}

export function ContactRow({ contact, title }: Props) {
  const Icon = ICON[contact.kind]
  return (
    <a
      href={hrefFor(contact)}
      className="flex items-center gap-3 py-3 min-h-[44px] hover:bg-surface rounded-pill px-2 -mx-2"
    >
      <span className="bg-sage-tint text-sage-deep p-2 rounded-full">
        <Icon size={16} />
      </span>
      <span className="flex-1">
        <span className="block text-ink">{title ?? contact.label ?? contact.value}</span>
        {title && <span className="block text-muted text-sm">{contact.value}</span>}
      </span>
    </a>
  )
}
