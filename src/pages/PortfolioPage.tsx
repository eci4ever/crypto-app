import { useMemo, useState, type FormEvent } from 'react'
import { useMarket } from '../hooks/useMarket.ts'
import { usePortfolio } from '../stores/portfolio.ts'
import { formatCompact, formatPercent, formatPrice, percentColor } from '../utils/format.ts'

export default function PortfolioPage() {
  const { positions, add, remove } = usePortfolio()
  const marketQuery = useMarket('usd')

  const [coinId, setCoinId] = useState('bitcoin')
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')

  const pricesUsd = useMemo(() => {
    const map: Record<string, number> = {}
    for (const coin of marketQuery.data ?? []) {
      map[coin.id] = coin.current_price
    }
    return map
  }, [marketQuery.data])

  const selectedCoin = marketQuery.data?.find((c) => c.id === coinId)

  const rows = useMemo(
    () =>
      positions.map((p) => {
        const priceUsd = pricesUsd[p.id] ?? 0
        const price = priceUsd
        const currentValue = p.amount * price
        const costBasis = p.amount * p.buyPrice
        const profit = currentValue - costBasis
        const profitPercent = costBasis > 0 ? (profit / costBasis) * 100 : 0
        return { ...p, price, currentValue, costBasis, profit, profitPercent }
      }),
    [positions, pricesUsd],
  )

  const totals = rows.reduce(
    (acc, row) => ({
      value: acc.value + row.currentValue,
      cost: acc.cost + row.costBasis,
    }),
    { value: 0, cost: 0 },
  )
  const totalProfit = totals.value - totals.cost
  const totalPercent = totals.cost > 0 ? (totalProfit / totals.cost) * 100 : 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const amountNum = Number(amount)
    const priceNum = Number(buyPrice)
    if (!selectedCoin || !Number.isFinite(amountNum) || !Number.isFinite(priceNum) || amountNum <= 0) {
      return
    }
    add({
      id: selectedCoin.id,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      amount: amountNum,
      buyPrice: priceNum,
    })
    setAmount('')
    setBuyPrice('')
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold text-slate-100">Portfolio</h1>
      <p className="mt-1 text-sm text-slate-400">
        Track the coins you hold. Values shown in USD.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-800 p-6 lg:col-span-1"
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Add position</h2>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Coin
              <select
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
              >
                {marketQuery.data?.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Amount held
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Buy price (USD)
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
              disabled={!selectedCoin || !amount || !buyPrice}
            >
              Add position
            </button>
          </div>
        </form>

        <div className="lg:col-span-2">
          <div className="mb-4 grid grid-cols-3 gap-4 rounded-xl border border-slate-800 p-6">
            <Stat label="Total value" value={formatCompact(totals.value)} />
            <Stat label="Total cost" value={formatCompact(totals.cost)} />
            <Stat
              label="Total P/L"
              value={`${formatPercent(totalPercent)} · ${formatCompact(totalProfit)}`}
              tone={totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Coin</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-right font-medium">Price</th>
                  <th className="px-4 py-3 text-right font-medium">Value</th>
                  <th className="px-4 py-3 text-right font-medium">P/L</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      No positions yet. Add your first coin.
                    </td>
                  </tr>
                )}
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-100">{row.name}</span>{' '}
                      <span className="text-slate-500">{row.symbol.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300">{row.amount}</td>
                    <td className="px-4 py-3 text-right text-slate-300">
                      {formatPrice(row.price, 'usd')}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-200">
                      {formatPrice(row.currentValue, 'usd')}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${percentColor(row.profitPercent)}`}>
                      {formatPercent(row.profitPercent)} · {formatCompact(row.profit)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        className="text-sm text-slate-500 transition-colors hover:text-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({
  label,
  value,
  tone = 'text-slate-100',
}: {
  label: string
  value: string
  tone?: string
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${tone}`}>{value}</div>
    </div>
  )
}
