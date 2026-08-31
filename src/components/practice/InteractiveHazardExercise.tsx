import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SpotHazardExercise, Sketch } from '../../types/sketch';
import { gradeSpotHazard } from '../../lib/practiceLogic';
import SketchVisual from '../SketchVisual';
import FeedbackBurst from '../motion/FeedbackBurst';

interface Props {
  exercise: SpotHazardExercise;
  sketch: Sketch;
  onResult: (passed: boolean, message?: string) => void;
}

export default function InteractiveHazardExercise({ exercise, sketch, onResult }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: '',
  });

  function toggle(id: string) {
    setFeedback({ show: false, success: false, message: '' });
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= exercise.requiredCount) return prev;
      return [...prev, id];
    });
  }

  function handleCheck() {
    const result = gradeSpotHazard(exercise, selected);
    const message = result.passed ? 'Hazards spotted.' : (result.message ?? 'Try again.');
    setFeedback({ show: true, success: result.passed, message });
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise exercise--interactive">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <p className="exercise-hint">
        Find {exercise.requiredCount} on the scene — {selected.length}/{exercise.requiredCount}
      </p>
      <motion.div
        className="exercise-scene"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SketchVisual
          sketch={sketch}
          selectedIds={selected}
          onHotspotClick={toggle}
          interactive
        />
      </motion.div>
      <motion.button
        type="button"
        className="btn btn-primary btn-game"
        disabled={selected.length !== exercise.requiredCount}
        onClick={handleCheck}
        whileTap={{ scale: 0.95 }}
      >
        Check hazards
      </motion.button>
      <FeedbackBurst show={feedback.show} success={feedback.success} message={feedback.message} />
    </div>
  );
}
