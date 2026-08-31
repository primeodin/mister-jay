import { useState } from 'react';
import type { OrderStepsExercise } from '../../types/sketch';
import { canCheckOrder, gradeOrderSteps, shuffleArray } from '../../lib/practiceLogic';

interface Props {
  exercise: OrderStepsExercise;
  onResult: (passed: boolean, message?: string) => void;
}

export default function OrderStepsExerciseView({ exercise, onResult }: Props) {
  const [pool] = useState(() => shuffleArray(exercise.steps));
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const required = exercise.correctOrder.length;
  const canCheck = canCheckOrder(exercise, selected);

  function pick(id: string) {
    setFeedback(null);
    if (selected.includes(id)) return;
    if (selected.length >= required) return;
    setSelected([...selected, id]);
  }

  function removeAt(index: number) {
    setFeedback(null);
    setSelected(selected.filter((_, i) => i !== index));
  }

  function handleCheck() {
    const result = gradeOrderSteps(exercise, selected);
    setFeedback(result.passed ? 'Correct order.' : (result.message ?? 'Try again.'));
    onResult(result.passed, result.message);
  }

  function reset() {
    setSelected([]);
    setFeedback(null);
  }

  const stepMap = Object.fromEntries(exercise.steps.map((s) => [s.id, s.text]));

  return (
    <div className="exercise">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <p className="exercise-hint">
        Tap steps in order — {selected.length}/{required}
      </p>

      {selected.length > 0 && (
        <ol className="order-list">
          {selected.map((id, i) => (
            <li key={`${id}-${i}`}>
              <span>{stepMap[id]}</span>
              <button type="button" className="order-remove" onClick={() => removeAt(i)}>
                ×
              </button>
            </li>
          ))}
        </ol>
      )}

      <div className="option-grid">
        {pool.map((step) => (
          <button
            key={step.id}
            type="button"
            className={`option-btn${selected.includes(step.id) ? ' used' : ''}`}
            disabled={selected.includes(step.id)}
            onClick={() => pick(step.id)}
          >
            {step.text}
          </button>
        ))}
      </div>

      <div className="exercise-actions">
        <button type="button" className="btn btn-secondary" onClick={reset}>
          Clear
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canCheck}
          onClick={handleCheck}
        >
          Check order
        </button>
      </div>
      {feedback && (
        <p className={`feedback${feedback.startsWith('Correct') ? ' feedback--ok' : ' feedback--err'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
