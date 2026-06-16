export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export function formatDate(iso: string): string {
  // Treat YYYY-MM-DD as a local calendar date — avoid TZ shift on phones.
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Returns a label like "Due Jul 1 · in 15 days" for the next rent due date.
 * `dayOfMonth` is 1-31. If today is past this month's due day, returns the
 * next month's date.
 */
export function nextDueDateLabel(dayOfMonth: number, now: Date = new Date()): string {
  const year = now.getFullYear()
  const month = now.getMonth() // 0-11
  const today = now.getDate()
  const nextMonth = today > dayOfMonth ? month + 1 : month
  const due = new Date(year, nextMonth, dayOfMonth)
  const dateLabel = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  // Day delta — use UTC-midnight math to avoid DST drift.
  const msPerDay = 24 * 60 * 60 * 1000
  const startOfToday = new Date(year, month, today).getTime()
  const startOfDue = new Date(year, nextMonth, dayOfMonth).getTime()
  const days = Math.round((startOfDue - startOfToday) / msPerDay)
  const dayPart =
    days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`
  return `Due ${dateLabel} · ${dayPart}`
}
