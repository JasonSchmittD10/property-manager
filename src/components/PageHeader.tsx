import { Eyebrow } from './Eyebrow'

/**
 * Standard page header — optional eyebrow + H1 + optional subtitle.
 * Used at the top of every screen (not inside cards).
 *
 * Sizes:
 *  - `lg` (default): 36px H1. Use on top-level / index screens.
 *  - `md`: 28px H1. Use on detail/viewer screens (e.g. DocumentView).
 *
 * Spacing matches the dominant pattern across the app:
 *   eyebrow → h1: 4px
 *   h1 → subtitle: 4px (size=lg) / 4px (size=md)
 * The Home dashboard uses tight (mt-0) header spacing per Figma 4:392
 * and intentionally does NOT use this component.
 */
interface Props {
  eyebrow?: string
  eyebrowTone?: 'accent' | 'subdued'
  title: string
  subtitle?: string
  size?: 'lg' | 'md'
  /**
   * Subtitle spacing under the H1:
   *  - `tight` (default): mt-1, used when the subtitle reads like a
   *    second line (address, file description).
   *  - `loose`: mt-2, used when the subtitle is a descriptive sentence
   *    that wants breathing room from the H1.
   */
  subtitleSpacing?: 'tight' | 'loose'
}

export function PageHeader({
  eyebrow,
  eyebrowTone = 'accent',
  title,
  subtitle,
  size = 'lg',
  subtitleSpacing = 'tight',
}: Props) {
  return (
    <header>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h1
        className={[
          size === 'lg' ? 'text-h1' : 'text-h1-sm',
          'text-ink',
          eyebrow ? 'mt-1' : '',
        ].join(' ')}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={[
            'text-body text-warm-700',
            subtitleSpacing === 'loose' ? 'mt-2' : 'mt-1',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
