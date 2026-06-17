import type { ComponentType } from 'react'

/**
 * Square sage-tint icon chip — the small 36×36 rounded tile that
 * holds a 20px Iconoir icon at the start of rows and at the top of
 * the Home action chips.
 *
 * Color: sage-600 fill on sage-tint background (Figma 4:392).
 */
interface IconCmpProps {
  size?: number
  className?: string
}

export function IconChip({
  Icon,
  size = 20,
  className = '',
}: {
  Icon: ComponentType<IconCmpProps>
  size?: number
  className?: string
}) {
  return (
    <span
      className={[
        'bg-sage-tint rounded-cardInner w-9 h-9',
        'flex items-center justify-center text-sage-600 shrink-0',
        className,
      ].join(' ')}
    >
      <Icon size={size} />
    </span>
  )
}
