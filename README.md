# Health App v2 — Interactive Prototype

Interactive PWA prototype for Tom's Health App v2. Built in React/Vite, deployed to Cloudflare Pages.

**Live:** https://health-app-prototype.pages.dev (or custom domain)

## Install as app on iPhone
1. Open the URL in Safari
2. Tap Share → "Add to Home Screen"
3. Tap Add

## Development
```bash
npm install
npm run dev
```

## Deployment
Auto-deploys to Cloudflare Pages on push to `main`.

## Design System
Design tokens are in `src/tokens.js` and `src/index.css`.
Colors, typography, and spacing defined here map to SwiftUI constants for Heph.

## Structure
- `src/screens/` — individual app screens
- `src/components/` — reusable UI components
- `src/tokens.js` — design token definitions
