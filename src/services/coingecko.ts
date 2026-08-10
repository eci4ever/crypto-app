import { FIAT_CURRENCIES } from './types.ts'
import type { CoinDetail, CoinMarket, FiatCode, MarketChart } from './types.ts'

const BASE_URL = 'https://api.coingecko.com/api/v3'

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`CoinGecko request failed: ${res.status} ${res.statusText}`)
  return (await res.json()) as T
}

export function fetchMarket(currency: string, perPage = 50): Promise<CoinMarket[]> {
  const params = new URLSearchParams({
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: String(perPage),
    page: '1',
    sparkline: 'true',
    price_change_percentage: '24h',
  })
  return request(`/coins/markets?${params.toString()}`)
}

export function fetchCoin(id: string): Promise<CoinDetail> {
  const params = new URLSearchParams({
    localization: 'false',
    tickers: 'false',
    community_data: 'false',
    developer_data: 'false',
  })
  return request(`/coins/${encodeURIComponent(id)}?${params.toString()}`)
}

export function fetchMarketChart(
  id: string,
  currency: string,
  days: number,
): Promise<MarketChart> {
  const params = new URLSearchParams({
    vs_currency: currency,
    days: String(days),
  })
  return request(`/coins/${encodeURIComponent(id)}/market_chart?${params.toString()}`)
}

export async function fetchUsdFiatRates(
  currencies: readonly string[] = FIAT_CURRENCIES,
): Promise<Record<string, number>> {
  const params = new URLSearchParams({
    ids: 'usd',
    vs_currencies: currencies.join(','),
  })
  const data = await request<Record<string, Record<string, number>>>(
    `/simple/price?${params.toString()}`,
  )
  return data.usd
}

export function isFiatCode(code: string): code is FiatCode {
  return (FIAT_CURRENCIES as readonly string[]).includes(code)
}
