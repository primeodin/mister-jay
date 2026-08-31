import { useState } from 'react';
import type { SpotHazardExercise } from '../../types/sketch';
import { gradeSpotHazard } from '../../lib/practiceLogic';

interface Props {
  exercise: SpotHazardExercise;
  onResult: (passed: boolean, message?: string) => void;
}

export default function SpotHazardExerciseView({ exercise, onResult }: Props) {
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
    const result = gradeSpotHazard(exercise, selected);
    setFeedback(result.passed ? 'Hazards spotted.' : (result.message ?? 'Try again.'));
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <p className="exercise-hint">
        Find {exercise.requiredCount} hazard{exercise.requiredCount > 1 ? 's' : ''} — {selected.length}/{exercise.requiredCount}
      </p>
      <div className="option-grid">
        {exercise.hazards.map((hazard) => (
          <button
            key={hazard.id}
            type="button"
            className={`option-btn option-btn--hazard${selected.includes(hazard.id) ? ' selected' : ''}`}
            onClick={() => toggle(hazard.id)}
          >
            {hazard.label}
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
        <p className={`feedback${feedback.startsWith('Hazards') ? ' feedback--ok' : ' feedback--err'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
