import { Link } from 'wouter'

export default function NotFound() {
  return (
    <div className="p-12 text-center">
      <p className="text-5xl font-semibold text-slate-700">404</p>
      <h1 className="mt-4 text-xl font-semibold text-slate-100">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-emerald-400 hover:underline">
        Back to market
      </Link>
    </div>
  )
}
