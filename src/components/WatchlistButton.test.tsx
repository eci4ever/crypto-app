import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { WatchlistButton } from './WatchlistButton.tsx'
import { useWatchlist } from '../stores/watchlist.ts'

beforeEach(() => {
  useWatchlist.setState({ ids: [] })
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('WatchlistButton', () => {
  it('toggles a coin into the watchlist', () => {
    render(<WatchlistButton id="bitcoin" />)
    const button = screen.getByRole('button', { name: 'Add bitcoin to watchlist' })
    fireEvent.click(button)
    expect(useWatchlist.getState().ids).toContain('bitcoin')
  })

  it('toggles a coin out of the watchlist', () => {
    useWatchlist.getState().toggle('bitcoin')
    render(<WatchlistButton id="bitcoin" />)
    const button = screen.getByRole('button', { name: 'Remove bitcoin from watchlist' })
    fireEvent.click(button)
    expect(useWatchlist.getState().ids).not.toContain('bitcoin')
  })
})
