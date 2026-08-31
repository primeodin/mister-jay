import { useState } from 'react';
import type { TapPartExercise } from '../../types/sketch';
import { gradeTapPart } from '../../lib/practiceLogic';

interface Props {
  exercise: TapPartExercise;
  onResult: (passed: boolean, message?: string) => void;
}

export default function TapPartExerciseView({ exercise, onResult }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  function toggle(id: string) {
    setFeedback(null);
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= exercise.requiredCount) {
        return prev;
      }
      return [...prev, id];
    });
  }

  function handleCheck() {
    const result = gradeTapPart(exercise, selected);
    setFeedback(result.passed ? 'Correct.' : (result.message ?? 'Try again.'));
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <p className="exercise-hint">
        Select {exercise.requiredCount} — {selected.length}/{exercise.requiredCount}
      </p>
      <div className="option-grid">
        {exercise.parts.map((part) => (
          <button
            key={part.id}
            type="button"
            className={`option-btn${selected.includes(part.id) ? ' selected' : ''}`}
            onClick={() => toggle(part.id)}
          >
            {part.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        disabled={selected.length !== exercise.requiredCount}
        onClick={handleCheck}
      >
        Check
      </button>
      {feedback && (
        <p className={`feedback${feedback === 'Correct.' ? ' feedback--ok' : ' feedback--err'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
