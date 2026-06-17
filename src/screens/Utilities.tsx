import { ContactRow } from '../components/ContactRow'
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/Card'
import { Eyebrow } from '../components/Eyebrow'
import { utilities } from '../config/property'

export default function Utilities() {
  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <BackLink to="/property">Property</BackLink>

      <PageHeader
        eyebrow="Setup"
        title="Utilities"
        subtitle="Set up utilities in your name effective on your lease start date. Internet is provided by the landlord and included in rent."
        subtitleSpacing="loose"
      />

      <div className="space-y-4">
        {utilities.map((u) => (
          <Card as="section" key={u.id}>
            <Eyebrow tone="subdued">{u.category}</Eyebrow>
            <p className="font-heading text-lg text-ink mt-1">{u.name}</p>
            {u.note && <p className="text-sm text-warm-700 mt-2">{u.note}</p>}
            {u.setupBy === 'tenant' && (
              <div className="mt-2">
                {u.phone && (
                  <ContactRow
                    contact={{ kind: 'phone', value: u.phone }}
                    title="Call to set up"
                  />
                )}
                {u.email && (
                  <ContactRow contact={{ kind: 'email', value: u.email }} title={u.email} />
                )}
                {u.link && (
                  <ContactRow
                    contact={{ kind: 'url', value: u.link, label: 'Set up online' }}
                    title="Set up online"
                  />
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
