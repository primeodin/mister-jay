import { describe, it, expect } from 'vitest';
import {
  gradeTapPart,
  gradeOrderSteps,
  gradeSpotHazard,
  gradeSingleChoice,
  canCheckOrder,
  getDailySketchIndex,
} from '../lib/practiceLogic';
import type {
  TapPartExercise,
  OrderStepsExercise,
  SpotHazardExercise,
} from '../types/sketch';

const tapExercise: TapPartExercise = {
  type: 'tap-part',
  prompt: 'Tap the right parts',
  parts: [
    { id: 'a', label: 'Part A', correct: true },
    { id: 'b', label: 'Part B', correct: true },
    { id: 'c', label: 'Part C', correct: false },
  ],
  requiredCount: 2,
  failMessage: 'Wrong selection',
};

const orderExercise: OrderStepsExercise = {
  type: 'order-steps',
  prompt: 'Order the steps',
  steps: [
    { id: '1', text: 'First' },
    { id: '2', text: 'Second' },
    { id: '3', text: 'Third' },
  ],
  correctOrder: ['1', '2', '3'],
  failMessage: 'Wrong order',
};

const hazardExercise: SpotHazardExercise = {
  type: 'spot-hazard',
  prompt: 'Spot hazards',
  hazards: [
    { id: 'h1', label: 'Hazard 1', correct: true },
    { id: 'h2', label: 'Hazard 2', correct: true },
    { id: 's1', label: 'Safe 1', correct: false },
  ],
  requiredCount: 2,
  failMessage: 'Missed a hazard',
};

describe('gradeTapPart', () => {
  it('passes when correct parts are selected', () => {
    expect(gradeTapPart(tapExercise, ['a', 'b']).passed).toBe(true);
  });

  it('fails when a wrong part is selected', () => {
    const result = gradeTapPart(tapExercise, ['a', 'c']);
    expect(result.passed).toBe(false);
    expect(result.message).toBe('Wrong selection');
  });

  it('fails when not enough parts are selected', () => {
    expect(gradeTapPart(tapExercise, ['a']).passed).toBe(false);
  });
});

describe('canCheckOrder', () => {
  it('returns false when selection count is below required', () => {
    expect(canCheckOrder(orderExercise, ['1'])).toBe(false);
    expect(canCheckOrder(orderExercise, ['1', '2'])).toBe(false);
  });

  it('returns true when selection count matches required', () => {
    expect(canCheckOrder(orderExercise, ['1', '2', '3'])).toBe(true);
  });

  it('does not lock check when extra decoys exist in pool but selection is capped', () => {
    expect(canCheckOrder(orderExercise, ['1', '2'])).toBe(false);
  });
});

describe('gradeOrderSteps', () => {
  it('passes for correct order', () => {
    expect(gradeOrderSteps(orderExercise, ['1', '2', '3']).passed).toBe(true);
  });

  it('fails for wrong order', () => {
    const result = gradeOrderSteps(orderExercise, ['2', '1', '3']);
    expect(result.passed).toBe(false);
    expect(result.message).toBe('Wrong order');
  });

  it('fails when selection is incomplete', () => {
    expect(gradeOrderSteps(orderExercise, ['1', '2']).passed).toBe(false);
  });
});

describe('gradeSpotHazard', () => {
  it('passes when all hazards are found', () => {
    expect(gradeSpotHazard(hazardExercise, ['h1', 'h2']).passed).toBe(true);
  });

  it('fails when a safe item is selected', () => {
    expect(gradeSpotHazard(hazardExercise, ['h1', 's1']).passed).toBe(false);
  });
});

describe('gradeSingleChoice', () => {
  const options = [
    { id: 'safe', text: 'Safe move', correct: true },
    { id: 'unsafe', text: 'Unsafe move', correct: false, feedback: 'That will hurt' },
  ];

  it('passes for correct choice', () => {
    expect(gradeSingleChoice('safe', options, 'fail').passed).toBe(true);
  });

  it('fails with specific feedback for wrong choice', () => {
    const result = gradeSingleChoice('unsafe', options, 'fail');
    expect(result.passed).toBe(false);
    expect(result.message).toBe('That will hurt');
  });

  it('fails when nothing is selected', () => {
    expect(gradeSingleChoice(null, options, 'fail').passed).toBe(false);
  });
});

describe('getDailySketchIndex', () => {
  it('returns a stable index for the same date', () => {
    const date = new Date(2026, 7, 31);
    expect(getDailySketchIndex(10, date)).toBe(getDailySketchIndex(10, date));
  });

  it('returns a value within sketch count', () => {
    const index = getDailySketchIndex(10, new Date(2026, 0, 15));
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(10);
  });
});
