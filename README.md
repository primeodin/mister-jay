# Mister Jay

A mobile-first PWA dedicated to Jay — a father who was a general contractor, electrician, plumber, and handyman. He taught by showing: what you're looking at, what can hurt you, then the steps.

**For Jay.**

## Live app

[https://primeodin.github.io/mister-jay/](https://primeodin.github.io/mister-jay/)

## Features

- 10 complete sketches covering vehicle, electrical, plumbing, and household skills
- **3D shop scenes** (React Three Fiber) for breaker panel, car battery, tire/jack, and motorcycle — orbit, inspect, tap hotspots
- **Labeled SVG diagrams** for every sketch — garage-readable on a phone
- **Learn** pass: what you're looking at, safety hazards, step-by-step guidance with visual focus
- **Game-like Practice**: tap parts on the 3D scene or diagram, drag steps into order, spot hazards in context
- **Watch along** resources rail with curated YouTube search links per sketch
- **Vehicle picker** for sketches where year/make/model matters
- Motion and tactile feedback throughout (Framer Motion)
- Daily sketch (deterministic by date) plus full library
- Progress and streak tracking in localStorage
- Installable PWA with offline support (3D lazy-loads; diagrams work offline)

## Sketches

1. Change a tire
2. Replace a car battery
3. Change an engine air filter
4. Check and top up coolant
5. Read a house breaker panel
6. Reset a tripped breaker safely
7. Stop a dripping faucet
8. Unclog a sink without wrecking the trap
9. Walk / move a motorcycle without dropping it
10. Jump-start a car

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

For local preview with the GitHub Pages base path:

```bash
BASE_PATH=/mister-jay/ npm run build
npm run preview
```

## Tech stack

- Vite + React + TypeScript
- React Three Fiber + drei (3D scenes)
- Framer Motion (animations)
- vite-plugin-pwa (manifest, service worker, offline cache)
- Sketch content as JSON with SVG diagram components
- Vitest for practice logic tests
- GitHub Actions deploying to Pages from `main`

## License

MIT
