export interface Asset {
  kind: 'coin' | 'fiat'
  id: string
  symbol: string
  name: string
}

/**
 * Convert an amount from one asset to another by pivoting through USD.
 *
 * - coinPriceUsd: id -> price of one coin in USD
 * - usdFiatRates: fiat code -> units of that fiat per 1 USD
 *
 * Returns null when a required rate is missing.
 */
export function convert(
  amount: number,
  from: Asset,
  to: Asset,
  coinPriceUsd: Record<string, number>,
  usdFiatRates: Record<string, number>,
): number | null {
  if (!Number.isFinite(amount) || amount < 0) return null

  let usdValue: number
  if (from.kind === 'coin') {
    const price = coinPriceUsd[from.id]
    if (!Number.isFinite(price)) return null
    usdValue = amount * price
  } else {
    const rate = usdFiatRates[from.id]
    if (!Number.isFinite(rate)) return null
    usdValue = amount / rate
  }

  if (to.kind === 'coin') {
    const price = coinPriceUsd[to.id]
    if (!Number.isFinite(price)) return null
    return usdValue / price
  }

  const rate = usdFiatRates[to.id]
  if (!Number.isFinite(rate)) return null
  return usdValue * rate
}
