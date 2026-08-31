import type {
  OrderStepsExercise,
  PracticeExercise,
  TapPartExercise,
  SpotHazardExercise,
} from '../types/sketch';

export function gradeTapPart(
  exercise: TapPartExercise,
  selectedIds: string[],
): { passed: boolean; message?: string } {
  const correctIds = exercise.parts.filter((p) => p.correct).map((p) => p.id);
  const selectedCorrect = selectedIds.filter((id) =>
    correctIds.includes(id),
  );
  const selectedWrong = selectedIds.filter(
    (id) => !correctIds.includes(id),
  );

  if (selectedWrong.length > 0) {
    return { passed: false, message: exercise.failMessage };
  }
  if (selectedCorrect.length !== exercise.requiredCount) {
    return { passed: false, message: exercise.failMessage };
  }
  return { passed: true };
}

export function canCheckOrder(
  exercise: OrderStepsExercise,
  selectedIds: string[],
): boolean {
  return selectedIds.length === exercise.correctOrder.length;
}

export function gradeOrderSteps(
  exercise: OrderStepsExercise,
  selectedIds: string[],
): { passed: boolean; message?: string } {
  if (!canCheckOrder(exercise, selectedIds)) {
    return { passed: false, message: exercise.failMessage };
  }
  const passed = exercise.correctOrder.every(
    (id, index) => selectedIds[index] === id,
  );
  return passed
    ? { passed: true }
    : { passed: false, message: exercise.failMessage };
}

export function gradeSpotHazard(
  exercise: SpotHazardExercise,
  selectedIds: string[],
): { passed: boolean; message?: string } {
  const correctIds = exercise.hazards.filter((h) => h.correct).map((h) => h.id);
  const selectedCorrect = selectedIds.filter((id) =>
    correctIds.includes(id),
  );
  const selectedWrong = selectedIds.filter(
    (id) => !correctIds.includes(id),
  );

  if (selectedWrong.length > 0) {
    return { passed: false, message: exercise.failMessage };
  }
  if (selectedCorrect.length !== exercise.requiredCount) {
    return { passed: false, message: exercise.failMessage };
  }
  return { passed: true };
}

export function gradeSingleChoice(
  selectedId: string | null,
  options: { id: string; correct: boolean; feedback?: string }[],
  failMessage: string,
): { passed: boolean; message?: string } {
  if (!selectedId) {
    return { passed: false, message: failMessage };
  }
  const chosen = options.find((o) => o.id === selectedId);
  if (!chosen) {
    return { passed: false, message: failMessage };
  }
  if (chosen.correct) {
    return { passed: true };
  }
  return { passed: false, message: chosen.feedback ?? failMessage };
}

export function gradePracticeExercise(
  exercise: PracticeExercise,
  answer: string[] | string | null,
): { passed: boolean; message?: string } {
  switch (exercise.type) {
    case 'tap-part':
      return gradeTapPart(exercise, answer as string[]);
    case 'order-steps':
      return gradeOrderSteps(exercise, answer as string[]);
    case 'spot-hazard':
      return gradeSpotHazard(exercise, answer as string[]);
    case 'safe-next-move':
    case 'wrong-setup':
      return gradeSingleChoice(
        answer as string | null,
        exercise.options,
        exercise.failMessage,
      );
  }
}

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getDailySketchIndex(
  sketchCount: number,
  date: Date = new Date(),
): number {
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % sketchCount;
}
