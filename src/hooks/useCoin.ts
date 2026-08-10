import { useQuery } from '@tanstack/react-query'
import { fetchCoin } from '../services/coingecko.ts'

export function useCoin(id: string) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoin(id),
    staleTime: 5 * 60_000,
  })
}
