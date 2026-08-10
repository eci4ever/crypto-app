import { useQuery } from '@tanstack/react-query'
import { fetchMarketChart } from '../services/coingecko.ts'

export function useMarketChart(id: string, currency: string, days: number) {
  return useQuery({
    queryKey: ['marketChart', id, currency, days],
    queryFn: () => fetchMarketChart(id, currency, days),
    staleTime: 60_000,
  })
}
