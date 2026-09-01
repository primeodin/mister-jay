import type { LearnStep, Sketch } from '../types/sketch';

/** Build Learn flow: Look → Hazards → Shop tip → Steps */
export function getLearnSteps(sketch: Sketch): LearnStep[] {
  const [look, hazards, ...rest] = sketch.learn;
  const steps: LearnStep[] = [];

  if (look) {
    steps.push({ ...look, kind: 'look' });
  }
  if (hazards) {
    steps.push({ ...hazards, kind: 'hazards' });
  }

  if (sketch.shopTip) {
    const tip = sketch.shopTip;
    steps.push({
      kind: 'shop-tip',
      heading: tip.title ?? 'Shop tip',
      body: tip.body,
      callout: tip.caution,
      diagramFocus: tip.diagramHighlightIds,
    });
  }

  for (const section of rest) {
    steps.push({ ...section, kind: 'steps' });
  }

  return steps;
}
