import { useQuery } from '@tanstack/react-query'
import { fetchMarket } from '../services/coingecko.ts'

export function useMarket(currency: string) {
  return useQuery({
    queryKey: ['market', currency],
    queryFn: () => fetchMarket(currency),
    refetchInterval: 60_000,
    staleTime: 30_000,
  })
}
