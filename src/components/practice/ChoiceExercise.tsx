import { useState } from 'react';
import type { SafeNextMoveExercise, WrongSetupExercise } from '../../types/sketch';
import { gradeSingleChoice } from '../../lib/practiceLogic';

interface Props {
  exercise: SafeNextMoveExercise | WrongSetupExercise;
  onResult: (passed: boolean, message?: string) => void;
}

export default function ChoiceExerciseView({ exercise, onResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleCheck() {
    const result = gradeSingleChoice(
      selected,
      exercise.options,
      exercise.failMessage,
    );
    setFeedback(
      result.passed ? 'Right call.' : (result.message ?? 'Try again.'),
    );
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <div className="choice-list">
        {exercise.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`choice-btn${selected === opt.id ? ' selected' : ''}`}
            onClick={() => {
              setSelected(opt.id);
              setFeedback(null);
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!selected}
        onClick={handleCheck}
      >
        Check
      </button>
      {feedback && (
        <p className={`feedback${feedback === 'Right call.' ? ' feedback--ok' : ' feedback--err'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
