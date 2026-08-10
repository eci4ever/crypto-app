import { useEffect, useRef } from 'react'
import {
  ColorType,
  LineSeries,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts'

interface PriceChartProps {
  prices: [number, number][]
  color?: string
}

export function PriceChart({ prices, color = '#34d399' }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 360,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
        fontFamily: 'system-ui, sans-serif',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      rightPriceScale: { borderColor: '#334155' },
      timeScale: { borderColor: '#334155', timeVisible: false },
      crosshair: {
        vertLine: { color: '#475569' },
        horzLine: { color: '#475569' },
      },
    })

    const series = chart.addSeries(LineSeries, {
      color,
      lineWidth: 2,
      priceLineVisible: false,
    })

    chartRef.current = chart
    seriesRef.current = series

    const observer = new ResizeObserver(() => {
      chart.applyOptions({ width: container.clientWidth })
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [color])

  useEffect(() => {
    const series = seriesRef.current
    if (!series) return
    if (prices.length < 2) {
      series.setData([])
      return
    }
    const data = prices.map(([time, value]) => ({
      time: time as UTCTimestamp,
      value,
    }))
    series.setData(data)
    chartRef.current?.timeScale().fitContent()
  }, [prices])

  return <div ref={containerRef} className="w-full" />
}
