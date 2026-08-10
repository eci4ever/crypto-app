import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  fetchCoin,
  fetchMarket,
  fetchMarketChart,
  fetchUsdFiatRates,
} from './coingecko.ts'

function mockFetchOnce(data: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    statusText: ok ? 'OK' : 'Bad Request',
    json: async () => data,
  } as Response)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('CoinGecko client', () => {
  it('fetches market data with expected query params', async () => {
    const fetchMock = mockFetchOnce([{ id: 'bitcoin' }])
    vi.stubGlobal('fetch', fetchMock)

    await fetchMarket('myr', 25)

    const url = fetchMock.mock.calls[0][0] as string
    expect(url.startsWith('https://api.coingecko.com/api/v3/coins/markets')).toBe(true)
    expect(url).toContain('vs_currency=myr')
    expect(url).toContain('per_page=25')
    expect(url).toContain('sparkline=true')
  })

  it('throws on non-OK responses', async () => {
    vi.stubGlobal('fetch', mockFetchOnce(null, false, 429))
    await expect(fetchMarket('usd')).rejects.toThrow('429')
  })

  it('fetches a single coin by id', async () => {
    const fetchMock = mockFetchOnce({ id: 'bitcoin' })
    vi.stubGlobal('fetch', fetchMock)
    await fetchCoin('bitcoin')
    const url = fetchMock.mock.calls[0][0] as string
    expect(url).toContain('/coins/bitcoin?')
    expect(url).toContain('localization=false')
  })

  it('fetches a market chart with days param', async () => {
    const fetchMock = mockFetchOnce({ prices: [[1, 2]] })
    vi.stubGlobal('fetch', fetchMock)
    await fetchMarketChart('ethereum', 'usd', 7)
    const url = fetchMock.mock.calls[0][0] as string
    expect(url).toContain('/coins/ethereum/market_chart?')
    expect(url).toContain('days=7')
    expect(url).toContain('vs_currency=usd')
  })

  it('returns fiat rates keyed by currency', async () => {
    vi.stubGlobal('fetch', mockFetchOnce({ usd: { usd: 1, myr: 4.5 } }))
    const rates = await fetchUsdFiatRates(['usd', 'myr'])
    expect(rates).toEqual({ usd: 1, myr: 4.5 })
  })
})
