import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSketchById } from '../data/sketches';
import { loadProgress, getSketchProgress, markPracticeComplete } from '../lib/storage';
import PracticeExerciseView from '../components/practice/PracticeExerciseView';
import { playThunk } from '../lib/audio';

export default function PracticePage() {
  const { id } = useParams<{ id: string }>();
  const sketch = id ? getSketchById(id) : undefined;
  const progress = id ? getSketchProgress(loadProgress(), id) : null;
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  if (!sketch) {
    return <Navigate to="/" replace />;
  }

  if (!progress?.learnComplete) {
    return <Navigate to={`/sketch/${sketch.id}/learn`} replace />;
  }

  const exercises = sketch.practice;
  const current = exercises[exerciseIndex];
  const isLast = exerciseIndex === exercises.length - 1;

  function handleResult(passed: boolean) {
    if (!passed) return;
    const newScores = [...scores];
    newScores[exerciseIndex] = true;
    setScores(newScores);

    setTimeout(() => {
      if (isLast) {
        const total = newScores.filter(Boolean).length;
        const pct = Math.round((total / exercises.length) * 100);
        markPracticeComplete(sketch!.id, pct);
        playThunk();
        setFinished(true);
      } else {
        setExerciseIndex(exerciseIndex + 1);
      }
    }, 900);
  }

  if (finished) {
    const passed = scores.filter(Boolean).length;
    return (
      <div className="viewport practice-viewport">
        <Link to={`/sketch/${sketch.id}`} className="viewport-back stamp">← BAY</Link>
        <motion.div
          className="completion-plate"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="practice-score-ring">{passed}/{exercises.length}</div>
          <h2>Practice cleared.</h2>
          <p>Jay would nod and hand you the next tool.</p>
          <Link to="/" className="btn btn-hero">Back to rack</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="viewport practice-viewport"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Link to={`/sketch/${sketch.id}`} className="viewport-back stamp">← BAY</Link>
      <div className="practice-hud-bar">
        <h2 className="practice-hud-title">{sketch.title}</h2>
        <div className="practice-hud-meta">
          <span className="stamp">ROUND {exerciseIndex + 1}/{exercises.length}</span>
          <div className="step-dots">
            {exercises.map((_, i) => (
              <span
                key={i}
                className={`step-dot${i === exerciseIndex ? ' active' : ''}${scores[i] ? ' done' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        key={exerciseIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.38 }}
      >
        <PracticeExerciseView
          exercise={current}
          sketch={sketch}
          onResult={handleResult}
        />
      </motion.div>
    </motion.div>
  );
}
