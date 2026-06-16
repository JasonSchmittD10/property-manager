import { type HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={'bg-card border-hair border-border rounded-card p-4 ' + className}
      {...props}
    />
  )
}
