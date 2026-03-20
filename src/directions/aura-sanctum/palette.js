/* ── Aura Sanctum Palette ─────────────────────────────── */
export const BG = '#0A0C12';
export const BG_CARD = '#111520';
export const BG_SHEET = '#141824';
export const GOLD = '#C9A96E';
export const GOLD_LT = '#E8D5A8';
export const GOLD_DARK = '#8B6A35';
export const CREAM = '#E8E4D8';
export const TEXT = '#E8E4D8';
export const TEXT_DIM = '#8A8070';
export const TEXT_SUBTLE = '#5A5248';
export const RULE = 'rgba(201,169,110,0.2)';
export const BORDER = 'rgba(255,255,255,0.06)';
export const RECOVERY = '#4ECDC4';
export const SLEEP = '#9B59B6';
export const STRAIN = '#F0943A';

/* ── SVG Icon Paths ───────────────────────────────────── */
export const ICONS = {
  recovery: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  sleep: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  strain: 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  journal: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  library: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
  profile: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  back: 'M19 12H5 M12 19l-7-7 7-7',
  close: 'M18 6L6 18 M6 6l12 12',
  chevron: 'M9 18l6-6-6-6',
  exit: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  dumbbell: 'M6.5 6.5h11 M6.5 17.5h11 M3 6.5v11 M21 6.5v11 M3 10v4 M21 10v4',
  pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  weight: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
  thermometer: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
  wind: 'M9.59 4.59A2 2 0 1 1 11 8H2 M12.59 19.41A2 2 0 1 0 14 16H2 M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2',
};

/* ── Common button reset ──────────────────────────────── */
export const btnReset = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  WebkitTapHighlightColor: 'transparent',
  outline: 'none',
  fontFamily: 'inherit',
};

/* ── Spaced caps label style ──────────────────────────── */
export const spacedCaps = {
  fontSize: 11,
  letterSpacing: 2.5,
  textTransform: 'uppercase',
  color: GOLD,
  fontVariant: 'small-caps',
};
