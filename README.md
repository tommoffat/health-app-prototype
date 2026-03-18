# Health App v2 — Interactive Prototype

Interactive PWA prototype for Tom's Health App v2. Built in React/Vite, deployed to Cloudflare Pages.

**Live:** https://health-app-prototype.pages.dev

## Install as app on iPhone
1. Open https://health-app-prototype.pages.dev in Safari
2. Tap Share → "Add to Home Screen"
3. Tap Add

## Development
```bash
npm install
npm run dev
```

## Deploy
```bash
export CLOUDFLARE_API_TOKEN="<from 1Password: CloudFlare Athena > API token>"
export CLOUDFLARE_ACCOUNT_ID="6cab3d218bb0a9f40d7a57d72df09fdd"
npm run build
wrangler pages deploy dist --project-name health-app-prototype --branch main
```

## Design System
Design tokens are in `src/tokens.js` and `src/index.css`.
Colors, typography, and spacing defined here map to SwiftUI constants for Heph.

## Structure
- `src/screens/` — individual app screens
- `src/components/` — reusable UI components
- `src/tokens.js` — design token definitions
