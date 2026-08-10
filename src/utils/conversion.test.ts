import { describe, expect, it } from 'vitest'
import { convert, type Asset } from './conversion.ts'

const btc: Asset = { kind: 'coin', id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' }
const eth: Asset = { kind: 'coin', id: 'ethereum', symbol: 'ETH', name: 'Ethereum' }
const usd: Asset = { kind: 'fiat', id: 'usd', symbol: 'USD', name: 'USD' }
const myr: Asset = { kind: 'fiat', id: 'myr', symbol: 'MYR', name: 'MYR' }

const coinPrices: Record<string, number> = { bitcoin: 60_000, ethereum: 3_000 }
const usdFiat: Record<string, number> = { usd: 1, myr: 4.5 }

describe('convert', () => {
  it('converts coin to fiat', () => {
    expect(convert(2, btc, usd, coinPrices, usdFiat)).toBe(120_000)
    expect(convert(2, btc, myr, coinPrices, usdFiat)).toBe(540_000)
  })

  it('converts fiat to coin', () => {
    expect(convert(120_000, usd, btc, coinPrices, usdFiat)).toBe(2)
    expect(convert(540_000, myr, btc, coinPrices, usdFiat)).toBe(2)
  })

  it('converts coin to coin through USD', () => {
    expect(convert(2, btc, eth, coinPrices, usdFiat)).toBe(40)
  })

  it('converts fiat to fiat', () => {
    expect(convert(450, myr, usd, coinPrices, usdFiat)).toBe(100)
  })

  it('returns null for unknown coin prices', () => {
    const unknown: Asset = { kind: 'coin', id: 'nope', symbol: 'X', name: 'X' }
    expect(convert(1, unknown, usd, coinPrices, usdFiat)).toBeNull()
  })

  it('returns null for negative or non-numeric amounts', () => {
    expect(convert(-1, btc, usd, coinPrices, usdFiat)).toBeNull()
    expect(convert(Number.NaN, btc, usd, coinPrices, usdFiat)).toBeNull()
  })
})
