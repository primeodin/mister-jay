import { describe, it, expect } from 'vitest';
import { getLearnSteps } from './learnSteps';
import type { Sketch } from '../types/sketch';

const baseSketch: Sketch = {
  id: 'test',
  title: 'Test',
  category: 'vehicle',
  summary: 'Test',
  learn: [
    { heading: 'Look', body: 'Look body' },
    { heading: 'Hazards', body: 'Hazard body' },
    { heading: 'Steps', body: 'Step body' },
  ],
  practice: [],
  diagramId: 'change-tire',
};

describe('getLearnSteps', () => {
  it('inserts shop tip after hazards and before steps', () => {
    const sketch: Sketch = {
      ...baseSketch,
      shopTip: {
        body: 'Jay says loosen on the ground.',
        diagramHighlightIds: ['lug-nuts'],
      },
    };

    const steps = getLearnSteps(sketch);
    expect(steps).toHaveLength(4);
    expect(steps.map((s) => s.kind)).toEqual(['look', 'hazards', 'shop-tip', 'steps']);
    expect(steps[2].heading).toBe('Shop tip');
    expect(steps[2].diagramFocus).toEqual(['lug-nuts']);
  });

  it('returns three steps when no shop tip', () => {
    const steps = getLearnSteps(baseSketch);
    expect(steps).toHaveLength(3);
    expect(steps.map((s) => s.kind)).toEqual(['look', 'hazards', 'steps']);
  });
});
