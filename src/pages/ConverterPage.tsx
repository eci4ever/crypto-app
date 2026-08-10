import { useMemo, useState } from 'react'
import { useMarket } from '../hooks/useMarket.ts'
import { useUsdFiatRates } from '../hooks/useUsdFiatRates.ts'
import { FIAT_CURRENCIES } from '../services/types.ts'
import { convert, type Asset } from '../utils/conversion.ts'
import { formatNumber } from '../utils/format.ts'

function fiatAsset(code: string): Asset {
  return { kind: 'fiat', id: code, symbol: code.toUpperCase(), name: code.toUpperCase() }
}

export default function ConverterPage() {
  const marketQuery = useMarket('usd')
  const ratesQuery = useUsdFiatRates()

  const [amount, setAmount] = useState('1')
  const [fromId, setFromId] = useState('bitcoin')
  const [toId, setToId] = useState('usd')

  const assets = useMemo<Asset[]>(() => {
    const fiats = FIAT_CURRENCIES.map(fiatAsset)
    const coins: Asset[] = (marketQuery.data ?? []).map((c) => ({
      kind: 'coin',
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
    }))
    return [...fiats, ...coins]
  }, [marketQuery.data])

  const coinPricesUsd = useMemo(() => {
    const map: Record<string, number> = {}
    for (const coin of marketQuery.data ?? []) {
      map[coin.id] = coin.current_price
    }
    return map
  }, [marketQuery.data])

  const from = assets.find((a) => a.id === fromId) ?? assets[0]
  const to = assets.find((a) => a.id === toId) ?? assets[1]

  const numericAmount = Number(amount)
  const result = convert(
    numericAmount,
    from,
    to,
    coinPricesUsd,
    ratesQuery.data ?? {},
  )

  const loading = marketQuery.isLoading || ratesQuery.isLoading
  const error = marketQuery.isError || ratesQuery.isError

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-1 text-2xl font-semibold text-slate-100">Converter</h1>
      <p className="mb-6 text-sm text-slate-400">
        Convert between cryptocurrencies and fiat (pivoted through USD).
      </p>

      <div className="space-y-4 rounded-xl border border-slate-800 p-6">
        <label className="block text-sm font-medium text-slate-300">
          Amount
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <AssetSelect
            label="From"
            assets={assets}
            value={fromId}
            onChange={setFromId}
          />
          <AssetSelect
            label="To"
            assets={assets}
            value={toId}
            onChange={setToId}
          />
        </div>

        <div className="flex items-end justify-between border-t border-slate-800 pt-4">
          <div className="text-sm text-slate-400">Result</div>
          <div className="text-2xl font-semibold text-slate-100">
            {loading && '…'}
            {!loading && error && <span className="text-base text-red-400">Data unavailable</span>}
            {!loading && !error && result !== null && !Number.isNaN(result) && (
              formatNumber(result)
            )}
            {!loading && !error && result !== null && to.kind === 'fiat' && (
              <span className="ml-1 text-lg text-slate-400">
                {to.symbol}
              </span>
            )}
            {!loading && !error && (result === null || Number.isNaN(result)) && (
              <span className="text-base text-red-400">Enter a valid amount</span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-600">
        1 {from.symbol} = {to.kind === 'coin'
          ? `priced in USD via CoinGecko`
          : `via CoinGecko market data`} · rates not financial advice
      </p>
    </section>
  )
}

interface AssetSelectProps {
  label: string
  assets: Asset[]
  value: string
  onChange: (id: string) => void
}

function AssetSelect({ label, assets, value, onChange }: AssetSelectProps) {
  return (
    <label className="block text-sm font-medium text-slate-300">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
      >
        {assets.map((asset) => (
          <option key={`${asset.kind}-${asset.id}`} value={asset.id}>
            {asset.symbol} — {asset.name}
          </option>
        ))}
      </select>
    </label>
  )
}
