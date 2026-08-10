import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  currency: string
  setCurrency: (currency: string) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'usd',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'crypto-settings' },
  ),
)
