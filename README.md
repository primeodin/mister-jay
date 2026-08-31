# Mister Jay

A mobile-first PWA dedicated to Jay — a father who was a general contractor, electrician, plumber, and handyman. He taught by showing: what you're looking at, what can hurt you, then the steps.

**For Jay.**

## Live app

[https://primeodin.github.io/mister-jay/](https://primeodin.github.io/mister-jay/)

## Features

- 10 complete sketches covering vehicle, electrical, plumbing, and household skills
- **Learn** pass: what you're looking at, safety hazards, step-by-step guidance
- **Practice** pass: tap parts, order steps, spot hazards, choose safe moves
- Daily sketch (deterministic by date) plus full library
- Progress and streak tracking in localStorage
- Installable PWA with offline support

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
- vite-plugin-pwa (manifest, service worker, offline cache)
- Sketch content as JSON
- Vitest for practice logic tests
- GitHub Actions deploying to Pages from `main`

## License

MIT
