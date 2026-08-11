import { useMemo, useState } from 'react'
import CoinTable from '../components/CoinTable.tsx'
import { useMarket } from '../hooks/useMarket.ts'
import { useSettings } from '../stores/settings.ts'
import { useWatchlist } from '../stores/watchlist.ts'

type Filter = 'all' | 'watchlist'

export default function ListPage() {
  const currency = useSettings((s) => s.currency)
  const watchlistIds = useWatchlist((s) => s.ids)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const { data, isLoading, isError } = useMarket(currency)

  const coins = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    return data.filter((coin) => {
      if (filter === 'watchlist' && !watchlistIds.includes(coin.id)) return false
      if (!q) return true
      return (
        coin.name.toLowerCase().includes(q) ||
        coin.symbol.toLowerCase().includes(q)
      )
    })
  }, [data, query, filter, watchlistIds])

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Cryptocurrency Prices</h1>
          <p className="mt-1 text-sm text-slate-400">
            Top {coins.length} coins by market cap · refreshed every 60s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search coins…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500"
          />
          <div className="flex rounded-md border border-slate-700 text-sm">
            {(['all', 'watchlist'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`px-3 py-2 capitalize transition-colors ${filter === value
                    ? 'bg-emerald-600/20 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-slate-800 p-12 text-center text-slate-400">
          Loading market data…
        </div>
      )}
      {isError && (
        <div className="rounded-xl border border-red-800/60 bg-red-950/40 p-12 text-center text-red-300">
          Failed to load market data. Please check your connection and try again.
        </div>
      )}
      {!isLoading && !isError && (
        coins.length === 0 ? (
          <div className="rounded-xl border border-slate-800 p-12 text-center text-slate-400">
            No coins match your search.
          </div>
        ) : (
          <CoinTable coins={coins} currency={currency} />
        )
      )}
    </section>
  )
}
