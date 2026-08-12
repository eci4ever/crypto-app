import { useState } from 'react'
import { useParams } from 'wouter'
import { PriceChart } from '../components/PriceChart.tsx'
import { WatchlistButton } from '../components/WatchlistButton.tsx'
import { useCoin } from '../hooks/useCoin.ts'
import { useMarketChart } from '../hooks/useMarketChart.ts'
import { useSettings } from '../stores/settings.ts'
import { formatCompact, formatPercent, formatPrice, percentColor } from '../utils/format.ts'

const DAY_RANGES = [1, 7, 30, 90] as const

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent ?? ''
}

export default function CoinPage() {
  const { id } = useParams()
  const currency = useSettings((s) => s.currency)
  const [days, setDays] = useState<number>(7)

  const coinQuery = useCoin(id ?? '')
  const chartQuery = useMarketChart(id ?? '', currency, days)

  if (coinQuery.isLoading) {
    return <div className="p-12 text-center text-slate-400">Loading coin data…</div>
  }
  if (coinQuery.isError || !coinQuery.data) {
    return (
      <div className="rounded-xl border border-red-800/60 bg-red-950/40 p-12 text-center text-red-300">
        Could not load this coin.
      </div>
    )
  }

  const coin = coinQuery.data
  const md = coin.market_data
  const price = md.current_price[currency] ?? 0
  const change = md.price_change_percentage_24h
  const description = stripHtml(coin.description.en ?? '')

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <img src={coin.image.large} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
        <div className="mr-auto">
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-100">
            {coin.name} <span className="text-slate-500">{coin.symbol.toUpperCase()}</span>
          </h1>
          <p className="text-sm text-slate-400">Rank #{coin.market_cap_rank}</p>
        </div>
        <WatchlistButton id={coin.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 p-6 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-slate-100">
                {formatPrice(price, currency)}
              </div>
              <div className={`mt-1 text-sm font-medium ${percentColor(change)}`}>
                {formatPercent(change)} (24h)
              </div>
            </div>
            <div className="flex rounded-md border border-slate-700 text-sm">
              {DAY_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setDays(range)}
                  className={`px-3 py-1.5 transition-colors ${days === range
                      ? 'bg-emerald-600/20 text-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {range}d
                </button>
              ))}
            </div>
          </div>

          {chartQuery.isLoading && (
            <div className="flex h-72 items-center justify-center text-slate-500">Loading chart…</div>
          )}
          {chartQuery.data?.prices && (
            <PriceChart
              prices={chartQuery.data.prices}
              color={change >= 0 ? '#34d399' : '#f87171'}
            />
          )}
        </div>

        <div className="rounded-xl border border-slate-800 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Market Stats</h2>
          <dl className="space-y-3 text-sm">
            <StatRow label="Market Cap" value={formatCompact(md.market_cap[currency] ?? 0)} />
            <StatRow label="24h Volume" value={formatCompact(md.total_volume[currency] ?? 0)} />
            <StatRow label="24h High" value={formatPrice(md.high_24h[currency] ?? 0, currency)} />
            <StatRow label="24h Low" value={formatPrice(md.low_24h[currency] ?? 0, currency)} />
            <StatRow
              label="Circulating Supply"
              value={formatCompact(md.circulating_supply)}
            />
            <StatRow
              label="Total Supply"
              value={md.total_supply ? formatCompact(md.total_supply) : '—'}
            />
            <StatRow label="All-Time High" value={formatPrice(md.ath[currency] ?? 0, currency)} />
          </dl>
        </div>
      </div>

      {description && (
        <div className="mt-6 rounded-xl border border-slate-800 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-100">About</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300">{description}</p>
        </div>
      )}
    </section>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-slate-200">{value}</dd>
    </div>
  )
}
