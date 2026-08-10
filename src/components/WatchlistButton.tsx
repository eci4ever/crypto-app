import { useWatchlist } from '../stores/watchlist.ts'

interface WatchlistButtonProps {
  id: string
}

export function WatchlistButton({ id }: WatchlistButtonProps) {
  const has = useWatchlist((s) => s.has(id))
  const toggle = useWatchlist((s) => s.toggle)

  return (
    <button
      type="button"
      aria-label={has ? `Remove ${id} from watchlist` : `Add ${id} to watchlist`}
      aria-pressed={has}
      onClick={() => toggle(id)}
      className={`rounded-md px-2 py-1 text-lg leading-none transition-colors ${
        has
          ? 'text-red-400 hover:text-red-300'
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      {has ? '♥' : '♡'}
    </button>
  )
}
