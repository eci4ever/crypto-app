import { describe, expect, it } from 'vitest'
import {
  currencySymbol,
  formatCompact,
  formatNumber,
  formatPercent,
  formatPrice,
  percentColor,
} from './format.ts'

describe('formatPrice', () => {
  it('formats prices above 1 with 2 decimals', () => {
    expect(formatPrice(1234.5678, 'usd')).toBe('$1,234.57')
  })

  it('formats sub-cent prices with more precision', () => {
    expect(formatPrice(0.0123, 'usd')).toBe('$0.0123')
  })

  it('uses 8 decimals for micro-priced coins', () => {
    expect(formatPrice(0.00001234, 'usd')).toBe('$0.00001234')
  })

  it('uses the right symbol per currency', () => {
    expect(formatPrice(100, 'myr')).toBe('RM100.00')
    expect(formatPrice(100, 'eur')).toBe('€100.00')
  })

  it('falls back to the currency code for unknown currencies', () => {
    expect(formatPrice(5, 'xyz')).toBe('XYZ 5.00')
  })
})

describe('formatPercent', () => {
  it('prefixes positive values with a plus', () => {
    expect(formatPercent(2.5)).toBe('+2.50%')
  })

  it('keeps negative sign', () => {
    expect(formatPercent(-3.2)).toBe('-3.20%')
  })

  it('shows zero without a plus', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })
})

describe('formatCompact', () => {
  it('abbreviates large numbers', () => {
    expect(formatCompact(1_234_567_890)).toBe('1.23B')
  })

  it('returns a dash for non-finite values', () => {
    expect(formatCompact(Number.NaN)).toBe('—')
  })
})

describe('currencySymbol', () => {
  it('maps known codes', () => {
    expect(currencySymbol('usd')).toBe('$')
    expect(currencySymbol('myr')).toBe('RM')
  })
})

describe('formatNumber', () => {
  it('formats with up to 2 decimals', () => {
    expect(formatNumber(3.14159)).toBe('3.14')
  })
})

describe('percentColor', () => {
  it('is green for non-negative', () => {
    expect(percentColor(0)).toContain('emerald')
    expect(percentColor(5)).toContain('emerald')
  })

  it('is red for negative', () => {
    expect(percentColor(-1)).toContain('red')
  })
})
