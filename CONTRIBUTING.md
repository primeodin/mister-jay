# Contributing to Mister Jay

Welcome. This repo is a progressive web app of short interactive shop-skill sketches — vehicle, electrical, plumbing, household — dedicated to Jay. Live on GitHub Pages. Content (sketch JSON + diagrams) is the highest-leverage path for first PRs. Keep that bar in mind.

**Live:** https://primeodin.github.io/mister-jay/

## Map (fork to PR)

1. **Fork** this repo on GitHub, then clone your fork:

```bash
git clone https://github.com/<you>/mister-jay.git
cd mister-jay
```

2. **Install** deps:

```bash
npm install
```

3. Prove the wiring before you change anything:

```bash
npm test
npm run build
```

4. Run locally when you touch UI or content:

```bash
npm run dev
```

Optional GitHub Pages-path preview (matches the deployed base path):

```bash
BASE_PATH=/mister-jay/ npm run build
BASE_PATH=/mister-jay/ npm run preview
```

Scripts live in `package.json` — use those names; do not invent commands.

5. Branch for one small change, then open a focused PR back to `primeodin/mister-jay`.

## Sketch anatomy

Each sketch is a JSON file under `src/data/sketches/`. The TypeScript contract is `src/types/sketch.ts`. The index that registers sketches is `src/data/sketches.ts`.

| Field | Role |
| --- | --- |
| `id` | Stable slug (matches filename and usually `diagramId`) |
| `title` | Human title on the card / page |
| `category` | `vehicle` \| `electrical` \| `plumbing` \| `household` |
| `summary` | One-line tease |
| `learn[]` | Look / hazards / steps sections (`heading`, `body`, optional `callout`, optional `diagramFocus`) |
| `shopTip` | Unique DIY insight + judgment (`body`, optional `caution`, optional `diagramHighlightIds`) |
| `practice[]` | Drills: `tap-part`, `order-steps`, `spot-hazard`, `safe-next-move`, `wrong-setup` |
| `diagramId` | Key into `DiagramRenderer` (see `DiagramId` in `src/types/sketch.ts`) |
| `scene3d` | Optional 3D scene id — diagrams stay primary |
| `vehicleTypes` | Optional year/make/model picker notes |

Read an existing file (e.g. `src/data/sketches/unclog-sink.json`) before inventing a new shape.

## Shop tip rule

Every sketch should carry a **shop tip** that feels like driveway advice, not a textbook sidebar:

- **Unique DIY insight** — something you would not get from a generic how-to (coat-hanger / zip-strip drain tricks, torque judgment, trap washers, etc.).
- **Jay judgment** — when the hack is safe vs when it scrapes pipes, cracks plastic, or needs a pro. Put the "smart vs bites you" line in `caution` when it helps.

If the tip is generic ("be careful"), rewrite it until it teaches something specific.

## Diagrams

| Path | Role |
| --- | --- |
| `src/components/diagrams/*.tsx` | Illustrated SVG / diagram components (one per sketch) |
| `src/components/diagrams/DiagramRenderer.tsx` | Maps `DiagramId` → component; merges focus + highlight ids |
| `src/components/diagrams/diagramCraft.tsx` | Shared hotspot / craft helpers |

Rules:

- `diagramId` on the sketch must be a member of `DiagramId` and registered in the `diagrams` map inside `DiagramRenderer`.
- `learn[].diagramFocus` and `shopTip.diagramHighlightIds` must match **hotspot `id`s** defined in that diagram component. Mismatched ids silently do nothing useful.
- Illustrated-first: diagrams are the front door; React Three Fiber scenes are optional / secondary.

## Adding a sketch checklist

1. Add `src/data/sketches/<id>.json` with `id`, `title`, `category`, `summary`, `learn[]`, `shopTip`, `practice[]`, `diagramId`.
2. Import and append it in `src/data/sketches.ts`.
3. If `diagramId` is new: extend `DiagramId` in `src/types/sketch.ts`, add `src/components/diagrams/<Name>Diagram.tsx`, register it in `DiagramRenderer`.
4. Wire hotspot ids so `diagramFocus` / `diagramHighlightIds` light the right parts.
5. Run `npm test` and `npm run build` (and `npm run dev` to click through Learn + Practice).
6. Prefer one new sketch **or** one practice-gap fill per PR.

## Good first issues

- [#1](https://github.com/primeodin/mister-jay/issues/1) — watch-along links on sketch JSON
- [#2](https://github.com/primeodin/mister-jay/issues/2) — practice gaps on existing sketches

Claim one with a comment, then open the PR. Content and docs count.

## Shop rules

- Keep it small. One sketch or one drill per PR.
- Illustrated-first. Do not make 3D the only path for a new skill.
- Shop tip must include judgment (safe vs pro / scrapes pipes).
- Match the voice. Short, concrete, honest — shop notes, not marketing.
- No competitor learning-app mentions anywhere in copy, README, or commits destined for public surfaces.
- No secrets. Public repo + Pages.

## PR checklist

- [ ] `npm test` and `npm run build` pass
- [ ] Sketch (or drill) loads in `npm run dev` — Learn + Practice walkable
- [ ] Hotspot ids match `diagramFocus` / `diagramHighlightIds`
- [ ] Shop tip has a unique DIY beat + Jay judgment
- [ ] One idea — no drive-by refactors
- [ ] No competitor learning-app mentions

## What to skip

Please do not open PRs that rewrite the whole library at once, replace diagrams with 3D-only scenes, dump generic open-source boilerplate, mention competitor learning apps, or invent sketch fields that fight `src/types/sketch.ts` without updating types and tests.

Questions? Comment on the issue you are claiming — that thread is the right place.

