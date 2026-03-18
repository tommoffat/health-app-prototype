/**
 * Design Tokens — Health App v2
 * Single source of truth. Maps to both CSS variables (web prototype)
 * and will be used by Heph for SwiftUI constants.
 *
 * Direction TBD — placeholder tokens below pending PAN-201 direction selection.
 */
export const tokens = {
  // Colors — will be replaced once design direction is chosen
  color: {
    background: '#000000',
    surface:    '#111111',
    surfaceAlt: '#1C1C1E',
    accent:     '#6366F1',   // placeholder — indigo
    accentMuted:'#6366F133',
    textPrimary:'#FFFFFF',
    textSecondary:'#AEAEB2',
    textTertiary: '#636366',
    separator:  '#38383A',
    success:    '#30D158',
    warning:    '#FFD60A',
    destructive:'#FF453A',
  },

  // Typography
  font: {
    display:  "'SF Pro Display', -apple-system, sans-serif",
    text:     "'SF Pro Text', -apple-system, sans-serif",
    mono:     "'SF Mono', monospace",
  },

  // Spacing (8pt grid)
  space: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
    xxl: '48px',
  },

  // Border radius
  radius: {
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    full: '9999px',
  },
}

export default tokens
