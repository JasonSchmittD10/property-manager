import { Link, Navigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { favoritesMap } from '../config/property'

export default function GuideMap() {
  if (!favoritesMap.enabled) {
    return <Navigate to="/guide" replace />
  }

  const embedReady =
    favoritesMap.embedUrl.length > 0 && !favoritesMap.embedUrl.startsWith('TODO')

  return (
    <div className="px-6 pt-4 pb-8 space-y-6">
      <Link
        to="/guide"
        className="inline-flex items-center gap-1 text-sage text-sm font-medium min-h-[44px]"
      >
        <ChevronLeft size={16} />
        Guide
      </Link>

      <header>
        <p className="font-body font-bold text-[12px] tracking-eyebrow uppercase text-sage">
          From {`Jason & Abby`}
        </p>
        <h1 className="font-heading text-[36px] leading-none text-ink mt-1">
          {favoritesMap.heading}
        </h1>
        <p className="font-body font-medium text-[14px] text-warm-400 mt-2">
          {favoritesMap.blurb}
        </p>
      </header>

      {embedReady ? (
        <div className="overflow-hidden rounded-cardLg border-hair border-warm-200">
          <iframe
            title={favoritesMap.heading}
            src={favoritesMap.embedUrl}
            loading="lazy"
            className="block w-full h-[calc(100vh-18rem)] min-h-[420px] border-0"
          />
        </div>
      ) : null}

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
