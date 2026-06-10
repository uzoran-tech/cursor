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

## Notes

- Story content is curated demo data in `src/data.js`; images are stable
  seeded photos from picsum.photos with a gradient fallback offline. To wire
  up a real source, replace `articlesFor()` with a fetch against your feed
  or news API of choice.
- The page-flip mechanics live in `src/components/FlipView.jsx`: during a
  turn the page is split into two static halves plus a rotating panel whose
  front and back faces show the outgoing and incoming half-pages.
