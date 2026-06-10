# Folio — a Flipboard-style magazine reader

Folio is a personal-magazine news reader inspired by Flipboard, built with
React and Vite. Browse topic feeds as a mosaic of story cards, then open any
section as a full-screen magazine and flip through it page by page with the
signature center-fold page-turn animation.

## Features

- **Magazine flip reading** — full-screen pages that fold around the
  horizontal centerline (3D CSS), driven by scroll wheel, vertical swipe,
  arrow keys, space, or the on-screen controls. Each section opens with a
  cover page.
- **Topic feeds** — For You, Technology, Science, Design, Business, Travel,
  and Culture, each with a hero-led mosaic layout.
- **Flip it to save** — flag any story from a card or from inside the
  magazine; saved stories live in the **Saved** tab and persist in
  `localStorage`.
- **Responsive** — the mosaic collapses gracefully down to a single column,
  and the flip view works with touch.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Testing on your iPhone

There are three ways, from fastest to most native:

### 1. Same Wi-Fi (instant, no account needed)

On your computer:

```bash
npm install
npm run dev -- --host
```

Vite prints a `Network:` URL like `http://192.168.1.23:5173`. Open that URL
in Safari on your iPhone (phone and computer must be on the same Wi-Fi).

### 2. Install as an app via GitHub Pages (PWA)

1. In the GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions** (one-time step).
2. Push to `main` (or run the *Deploy to GitHub Pages* workflow manually).
3. Open `https://uzoran-tech.github.io/cursor/` in Safari on your iPhone.
4. Tap **Share → Add to Home Screen**. Folio installs with its own icon,
   launches full-screen like a native app, and works offline thanks to the
   bundled service worker.

### 3. Native iOS app (requires a Mac with Xcode)

The repo includes a Capacitor iOS project in `ios/`. On a Mac:

```bash
npm install
npm run ios:sync      # builds the web app and syncs it into ios/
npm run ios:open      # opens ios/App in Xcode
```

In Xcode: select the **App** target → *Signing & Capabilities* → choose your
personal team (a free Apple ID works), plug in your iPhone, pick it as the
run destination, and press **Run**. On the phone, trust the developer
certificate under *Settings → General → VPN & Device Management* the first
time. For TestFlight distribution you'd need a paid Apple Developer account.

## Notes

- Story content is curated demo data in `src/data.js`; images are stable
  seeded photos from picsum.photos with a gradient fallback offline. To wire
  up a real source, replace `articlesFor()` with a fetch against your feed
  or news API of choice.
- The page-flip mechanics live in `src/components/FlipView.jsx`: during a
  turn the page is split into two static halves plus a rotating panel whose
  front and back faces show the outgoing and incoming half-pages.
