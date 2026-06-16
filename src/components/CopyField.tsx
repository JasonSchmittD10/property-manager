import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface Props {
  label: string
  value: string
}

export function CopyField({ label, value }: Props) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* no-op: clipboard may not be available */
    }
  }
  return (
    <button
      onClick={copy}
      className="w-full flex items-center justify-between text-left py-2 rounded-pill px-3 hover:bg-surface min-h-[44px]"
    >
      <span>
        <span className="block text-muted text-xs">{label}</span>
        <span className="block font-medium">{value}</span>
      </span>
      {copied ? (
        <Check size={16} className="text-sage" />
      ) : (
        <Copy size={16} className="text-muted" />
      )}
    </button>
  )
}
