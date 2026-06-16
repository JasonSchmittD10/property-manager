import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

const styles: Record<Variant, string> = {
  primary: 'bg-sage text-white active:bg-sage-deep border-transparent',
  secondary: 'bg-card text-ink border-border hover:bg-surface',
  ghost: 'bg-transparent text-ink border-transparent hover:bg-surface',
}

export function Button({ variant = 'primary', fullWidth, className = '', ...rest }: Props) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-pill border-hair px-5 py-3 font-medium',
        'transition active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sage',
        'min-h-[44px]',
        fullWidth ? 'w-full' : '',
        styles[variant],
        className,
      ].join(' ')}
      {...rest}
    />
  )
}
