interface SparklineProps {
  data: number[]
  positive: boolean
}

export function Sparkline({ data, positive }: SparklineProps) {
  if (!data.length) return null

  const width = 100
  const height = 32
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)

  const points = data
    .map((value, i) => {
      const x = i * step
      const y = height - 2 - ((value - min) / range) * (height - 4)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#34d399' : '#f87171'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
