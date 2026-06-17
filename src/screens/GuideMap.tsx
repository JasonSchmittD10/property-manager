import { Navigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { PageHeader } from '../components/PageHeader'
import { SpotsMap } from '../components/SpotsMap'
import { favoritesMap } from '../config/property'

export default function GuideMap() {
  if (!favoritesMap.enabled) {
    return <Navigate to="/guide" replace />
  }

  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <BackLink to="/guide">Guide</BackLink>

      <PageHeader
        eyebrow="From Jason & Abby"
        title={favoritesMap.heading}
        subtitle={favoritesMap.blurb}
        subtitleSpacing="loose"
      />

      <SpotsMap />

      <p className="text-sm">
        <a
          href={favoritesMap.shareUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sage font-medium"
        >
          Open in Google Maps
        </a>
      </p>
    </div>
  )
}
