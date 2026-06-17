export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
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
