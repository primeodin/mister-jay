# Mister Jay

Practice the shop skills Jay taught — vehicle, electrical, plumbing, household — the way a shop dad would: show the job, name the hazards, drop a real DIY tip with judgment, then drill until it sticks.

**For Jay.** Dedicated to a father who was a general contractor, electrician, plumber, and handyman. He taught by showing, not lecturing.

## Live app

**[Try it →](https://primeodin.github.io/mister-jay/)** · Installable PWA · works on a phone in the driveway

## What you get

- **10 interactive sketches** — tire, battery, air filter, coolant, breaker panel, tripped breaker, faucet, clogged sink, motorcycle move, jump-start
- **Illustrated-first UX** — garage-readable labeled diagrams as the main path (phone-friendly)
- **Learn + Practice** — what you are looking at, what can hurt you, then tap / reorder / spot-hazard drills
- **Shop tip beat** on every sketch — unique DIY / driveway insight plus Jay-style judgment: when the hack is safe vs when it scrapes pipes or needs a pro
- **Watch-along** links per sketch, **vehicle picker** where year/make/model matters
- Daily sketch (by date), library, local progress / streak, offline-capable PWA

3D shop scenes (React Three Fiber) are optional / secondary — diagrams and practice stay the front door.

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

Install deps, run the Vite app, run tests, then production build with the project scripts.

For a Pages-path local preview, build and preview with base path /mister-jay/.

## Tech stack

- Vite + React + TypeScript
- Illustrated SVG diagrams (primary UX)
- Optional React Three Fiber + drei scenes
- Framer Motion
- vite-plugin-pwa (manifest, service worker, offline)
- Sketch content as JSON + diagram components
- Vitest for practice logic
- GitHub Actions deploys Pages from main

## License

MIT
