import { useQuery } from '@tanstack/react-query'
import { fetchUsdFiatRates } from '../services/coingecko.ts'

export function useUsdFiatRates() {
  return useQuery({
    queryKey: ['usdFiatRates'],
    queryFn: () => fetchUsdFiatRates(),
    staleTime: 5 * 60_000,
  })
}
