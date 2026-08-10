const CURRENCY_SYMBOLS: Record<string, string> = {
  usd: '$',
  myr: 'RM',
  eur: '€',
  gbp: '£',
  jpy: '¥',
  sgd: 'S$',
}

export function currencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code.toLowerCase()] ?? `${code.toUpperCase()} `
}

export function formatPrice(price: number, code: string): string {
  const symbol = currencySymbol(code)
  const decimals = price >= 1 ? 2 : price >= 0.01 ? 4 : 8
  return `${symbol}${price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export function formatCompact(value: number): string {
  if (!Number.isFinite(value)) return '—'
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export function percentColor(value: number): string {
  return value >= 0 ? 'text-emerald-400' : 'text-red-400'
}
