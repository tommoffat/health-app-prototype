import React from 'react'

export default function Sparkline({ data = [], color = '#7B8EF0', width = 60, height = 32 }) {
  if (!data.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = pad + (1 - (v - min) / range) * (height - pad * 2)
    return `${x},${y}`
  })
  const fillPoints = [`${pad},${height - pad}`, ...points, `${width - pad},${height - pad}`]
  return (
    <svg width={width} height={height}>
      <polygon points={fillPoints.join(' ')} fill={color} opacity={0.2} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
