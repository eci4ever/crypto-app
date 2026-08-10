export interface CoinMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] } | null
}

export interface CoinDetail {
  id: string
  symbol: string
  name: string
  image: { large: string; small: string; thumb: string }
  description: { en: string }
  market_cap_rank: number
  market_data: {
    current_price: Record<string, number>
    market_cap: Record<string, number>
    total_volume: Record<string, number>
    high_24h: Record<string, number>
    low_24h: Record<string, number>
    price_change_percentage_24h: number
    circulating_supply: number
    total_supply: number | null
    ath: Record<string, number>
  }
}

export interface MarketChart {
  prices: [number, number][]
}

export const FIAT_CURRENCIES = ['usd', 'myr', 'eur', 'gbp', 'jpy', 'sgd'] as const
export type FiatCode = (typeof FIAT_CURRENCIES)[number]
