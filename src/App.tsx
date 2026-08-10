import { Route, Switch } from 'wouter'
import Navbar from './components/Navbar.tsx'
import CoinPage from './pages/CoinPage.tsx'
import ConverterPage from './pages/ConverterPage.tsx'
import ListPage from './pages/ListPage.tsx'
import NotFound from './pages/NotFound.tsx'
import PortfolioPage from './pages/PortfolioPage.tsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Switch>
          <Route path="/" component={ListPage} />
          <Route path="/coin/:id" component={CoinPage} />
          <Route path="/converter" component={ConverterPage} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  )
}
