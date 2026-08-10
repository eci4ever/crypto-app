import { Link } from 'wouter'
import type { CoinMarket } from '../services/types.ts'
import { formatCompact, formatPercent, formatPrice, percentColor } from '../utils/format.ts'
import { Sparkline } from './Sparkline.tsx'
import { WatchlistButton } from './WatchlistButton.tsx'

interface CoinTableProps {
  coins: CoinMarket[]
  currency: string
}

export default function CoinTable({ coins, currency }: CoinTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Coin</th>
            <th className="px-4 py-3 text-right font-medium">Price</th>
            <th className="px-4 py-3 text-right font-medium">24h %</th>
            <th className="hidden px-4 py-3 text-right font-medium md:table-cell">Market Cap</th>
            <th className="hidden px-4 py-3 text-right font-medium lg:table-cell">Volume</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Last 7 days</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/70">
          {coins.map((coin) => {
            const spark = coin.sparkline_in_7d?.price ?? []
            return (
              <tr
                key={coin.id}
                className="transition-colors hover:bg-slate-900/60"
              >
                <td className="px-4 py-3 text-slate-500">{coin.market_cap_rank}</td>
                <td className="px-4 py-3">
                  <Link href={`/coin/${coin.id}`} className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>
                      <span className="font-medium text-slate-100">{coin.name}</span>{' '}
                      <span className="text-slate-500">{coin.symbol.toUpperCase()}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-slate-200">
                  {formatPrice(coin.current_price, currency)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium ${percentColor(coin.price_change_percentage_24h)}`}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </td>
                <td className="hidden px-4 py-3 text-right text-slate-300 md:table-cell">
                  {formatCompact(coin.market_cap)}
                </td>
                <td className="hidden px-4 py-3 text-right text-slate-400 lg:table-cell">
                  {formatCompact(coin.total_volume)}
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  {spark.length > 1 ? (
                    <Sparkline data={spark} positive={coin.price_change_percentage_24h >= 0} />
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <WatchlistButton id={coin.id} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
