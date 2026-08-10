import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Position {
  id: string
  symbol: string
  name: string
  amount: number
  buyPrice: number
}

interface PortfolioState {
  positions: Position[]
  add: (position: Position) => void
  remove: (id: string) => void
}

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set) => ({
      positions: [],
      add: (position) => set((state) => ({ positions: [...state.positions, position] })),
      remove: (id) =>
        set((state) => ({ positions: state.positions.filter((p) => p.id !== id) })),
    }),
    { name: 'crypto-portfolio' },
  ),
)
