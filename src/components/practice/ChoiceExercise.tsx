import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SafeNextMoveExercise, WrongSetupExercise, Sketch } from '../../types/sketch';
import { gradeSingleChoice } from '../../lib/practiceLogic';
import SketchVisual from '../SketchVisual';
import FeedbackBurst from '../motion/FeedbackBurst';

interface Props {
  exercise: SafeNextMoveExercise | WrongSetupExercise;
  sketch: Sketch;
  onResult: (passed: boolean, message?: string) => void;
}

export default function ChoiceExerciseView({ exercise, sketch, onResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: '',
  });

  function handleCheck() {
    const result = gradeSingleChoice(
      selected,
      exercise.options,
      exercise.failMessage,
    );
    const message = result.passed ? 'Right call.' : (result.message ?? 'Try again.');
    setFeedback({ show: true, success: result.passed, message });
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise exercise--interactive">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <div className="choice-scene-wrap">
        <SketchVisual sketch={sketch} variant="viewport" />
      </div>
      <div className="choice-list">
        {exercise.options.map((opt, i) => (
          <motion.button
            key={opt.id}
            type="button"
            className={`choice-btn${selected === opt.id ? ' selected' : ''}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelected(opt.id);
              setFeedback({ show: false, success: false, message: '' });
            }}
          >
            {opt.text}
          </motion.button>
        ))}
      </div>
      <motion.button
        type="button"
        className="btn btn-primary btn-game"
        disabled={!selected}
        onClick={handleCheck}
        whileTap={{ scale: 0.95 }}
      >
        Check
      </motion.button>
      <FeedbackBurst show={feedback.show} success={feedback.success} message={feedback.message} shake />
    </div>
  );
}
