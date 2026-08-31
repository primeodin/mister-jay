import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import type { OrderStepsExercise, Sketch } from '../../types/sketch';
import { canCheckOrder, gradeOrderSteps, shuffleArray } from '../../lib/practiceLogic';
import SketchVisual from '../SketchVisual';
import FeedbackBurst from '../motion/FeedbackBurst';

interface Props {
  exercise: OrderStepsExercise;
  sketch: Sketch;
  onResult: (passed: boolean, message?: string) => void;
}

export default function DragOrderExercise({ exercise, sketch, onResult }: Props) {
  const [pool] = useState(() => shuffleArray(exercise.steps));
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: '',
  });

  const required = exercise.correctOrder.length;
  const canCheck = canCheckOrder(exercise, selected);
  const stepMap = Object.fromEntries(exercise.steps.map((s) => [s.id, s.text]));
  const remaining = pool.filter((s) => !selected.includes(s.id));

  function pick(id: string) {
    setFeedback({ show: false, success: false, message: '' });
    if (selected.includes(id) || selected.length >= required) return;
    setSelected([...selected, id]);
  }

  function handleCheck() {
    const result = gradeOrderSteps(exercise, selected);
    const message = result.passed ? 'Correct order.' : (result.message ?? 'Try again.');
    setFeedback({ show: true, success: result.passed, message });
    onResult(result.passed, result.message);
  }

  return (
    <div className="exercise exercise--interactive">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <p className="exercise-hint">Drag steps into order on the workbench — {selected.length}/{required}</p>

      <div className="drag-order-layout">
        <SketchVisual sketch={sketch} prefer3d={false} />
        <div className="drag-order-panel">
          {selected.length > 0 && (
            <Reorder.Group axis="y" values={selected} onReorder={setSelected} className="reorder-list">
              {selected.map((id) => (
                <Reorder.Item key={id} value={id} className="reorder-item">
                  <span className="reorder-grip">⠿</span>
                  {stepMap[id]}
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <div className="step-pool">
            {remaining.map((step) => (
              <motion.button
                key={step.id}
                type="button"
                className="step-chip"
                whileTap={{ scale: 0.94 }}
                onClick={() => pick(step.id)}
              >
                {step.text}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        className="btn btn-primary btn-game"
        disabled={!canCheck}
        onClick={handleCheck}
        whileTap={{ scale: 0.95 }}
      >
        Check order
      </motion.button>
      <FeedbackBurst show={feedback.show} success={feedback.success} message={feedback.message} />
    </div>
  );
}
