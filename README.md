# Crypto App

A dark-themed cryptocurrency price viewer built with **React 19**, **TypeScript**, and **Vite**, powered by the free [CoinGecko API](https://www.coingecko.com/en/api).

View the top coins, dig into their price history, convert between crypto and fiat, and track your own holdings — all client-side, with no API key required.

## Features

- **Market list** — top 50 coins by market cap with price, 24h change, market cap, volume, a 7-day sparkline, live search, and an All / Watchlist filter
- **Coin detail** — interactive price chart ([lightweight-charts](https://github.com/tradingview/lightweight-charts)) for 1 / 7 / 30 / 90-day ranges, market stats, and description
- **Converter** — crypto ↔ fiat and crypto ↔ crypto, pivoted through USD
- **Watchlist** — heart-toggle coins, persisted in `localStorage`
- **Portfolio** — add positions (coin, amount, buy price); see current value and profit/loss
- **Fiat currency toggle** — USD / MYR / EUR / GBP / JPY / SGD from the navbar
- **60-second auto-refresh** via TanStack Query, staying inside CoinGecko's free-tier rate limits

## Tech Stack

| Layer | Tool |
| --- | --- |
| Language | TypeScript ~6.0 |
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | wouter |
| State | Zustand (persisted) |
| Data fetching | TanStack Query |
| Charts | lightweight-charts v5 |
| Tests | Vitest + Testing Library |

## Getting Started

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev        # start the dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck (tsc) + production build to dist/
npm run preview    # preview the production build locally
npm test           # run tests once
npm run test:watch # run tests in watch mode
```

## Project Structure

```
src/
├── components/   Reusable UI: Navbar, CoinTable, PriceChart, Sparkline, WatchlistButton
├── pages/        Screens: ListPage, CoinPage, ConverterPage, PortfolioPage, NotFound
├── stores/       Zustand stores: settings, watchlist, portfolio (localStorage-persisted)
├── services/     CoinGecko API client + TypeScript types
├── hooks/        useMarket, useCoin, useMarketChart, useUsdFiatRates
├── utils/        Pure helpers: format (currency/percent) and conversion
└── main.tsx      React entry point (mounted by index.html)
```

## How It Works

The browser loads `index.html`, which mounts the React app from `src/main.tsx`. `src/App.tsx` owns routing (`#/`, `#/coin/:id`, `#/converter`, `#/portfolio`) and composes the pages. All market data is fetched client-side from CoinGecko's public endpoints — there is no backend.

Portfolio values are computed live from the current market price; the converter converts any asset to any other asset by pivoting through USD.

## Testing

```bash
npm test
```

Unit tests cover the formatters (`utils/format`), the conversion math (`utils/conversion`), the CoinGecko client (mocked `fetch`), and the `WatchlistButton` component.

## Roadmap / Ideas

- Multi-currency portfolio display (currently USD-only)
- Coin search on the detail page
- Pagination or "load more" beyond the top 50

## Learning Workspace

This repo also contains a teaching workspace for learning TypeScript, React, and frontend development in the context of this codebase — see [`MISSION.md`](./MISSION.md), [`lessons/`](./lessons/), [`reference/`](./reference/), and [`RESOURCES.md`](./RESOURCES.md).

## License

No license specified. All data is © [CoinGecko](https://www.coingecko.com); price information is provided for educational purposes and is not financial advice.
