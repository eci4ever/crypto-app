import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FiatCode } from '../services/types.ts'

interface SettingsState {
  currency: FiatCode
  setCurrency: (currency: FiatCode) => void
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
