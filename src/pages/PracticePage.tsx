import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSketchById } from '../data/sketches';
import { loadProgress, getSketchProgress, markPracticeComplete } from '../lib/storage';
import PageTransition from '../components/motion/PageTransition';
import PracticeExerciseView from '../components/practice/PracticeExerciseView';

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
        setFinished(true);
      } else {
        setExerciseIndex(exerciseIndex + 1);
      }
    }, 900);
  }

  if (finished) {
    const passed = scores.filter(Boolean).length;
    return (
      <PageTransition className="practice-page">
        <Link to={`/sketch/${sketch.id}`} className="back-link">← Back</Link>
        <motion.div
          className="completion-card completion-card--celebrate"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          <motion.div
            className="practice-score-ring"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {passed}/{exercises.length}
          </motion.div>
          <h2>Practice pass done.</h2>
          <p>Jay would nod and hand you the next tool.</p>
          <Link to="/" className="btn btn-primary">Back to library</Link>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="practice-page">
      <Link to={`/sketch/${sketch.id}`} className="back-link">← Back</Link>
      <div className="practice-header">
        <h2>{sketch.title} — Practice</h2>
        <div className="practice-hud">
          <div className="step-dots">
            {exercises.map((_, i) => (
              <motion.span
                key={i}
                className={`step-dot${i === exerciseIndex ? ' active' : ''}${scores[i] ? ' done' : ''}`}
                animate={scores[i] ? { scale: [1, 1.4, 1] } : {}}
              />
            ))}
          </div>
          <span className="practice-round">
            Round {exerciseIndex + 1}/{exercises.length}
          </span>
        </div>
      </div>

      <motion.div
        key={exerciseIndex}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PracticeExerciseView
          exercise={current}
          sketch={sketch}
          onResult={handleResult}
        />
      </motion.div>
    </PageTransition>
  );
}
