// Clean SVG icon wrapper using Lucide-style paths
// All icons are 24x24 viewBox, stroke-based for crisp rendering
import React from 'react'

const ICONS = {
  home: (
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'home-fill': (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" stroke="none"/>
    </>
  ),
  journal: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  fitness: (
    <>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round"/>
      <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round"/>
      <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round"/>
    </>
  ),
  biology: (
    <>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round"/>
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  activity: (
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  zap: (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  droplets: (
    <>
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  thermometer: (
    <>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  brain: (
    <>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.81A3 3 0 1 1 9.5 2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.81A3 3 0 1 0 14.5 2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  moon: (
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'bar-chart': (
    <>
      <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round"/>
      <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round"/>
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" strokeLinecap="round"/>
      <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  dumbbell: (
    <>
      <path d="M6.5 6.5h11" strokeLinecap="round"/>
      <path d="M6.5 17.5h11" strokeLinecap="round"/>
      <path d="M3 9.5h3v5H3z" strokeLinejoin="round"/>
      <path d="M18 9.5h3v5h-3z" strokeLinejoin="round"/>
      <path d="M6 7.5v9" strokeLinecap="round"/>
      <path d="M18 7.5v9" strokeLinecap="round"/>
    </>
  ),
  share: (
    <>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16 6 12 2 8 6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="2" x2="12" y2="15" strokeLinecap="round"/>
    </>
  ),
  'chevron-right': (
    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-left': (
    <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
      <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round"/>
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
    </>
  ),
}

export default function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      style={{ display: 'block', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {ICONS[name] || <circle cx="12" cy="12" r="4"/>}
    </svg>
  )
}
