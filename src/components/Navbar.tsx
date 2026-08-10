import { Link } from 'wouter'
import { FIAT_CURRENCIES } from '../services/types.ts'
import { useSettings } from '../stores/settings.ts'

const NAV_LINKS = [
  { href: '/', label: 'Market' },
  { href: '/converter', label: 'Converter' },
  { href: '/portfolio', label: 'Portfolio' },
]

export default function Navbar() {
  const currency = useSettings((s) => s.currency)
  const setCurrency = useSettings((s) => s.setCurrency)

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-100">
          <span className="text-emerald-400">₿</span> Crypto App
        </Link>
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <select
            aria-label="Display currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="ml-2 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-500"
          >
            {FIAT_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  )
}
