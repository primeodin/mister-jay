import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getSketchById } from '../data/sketches';
import { loadProgress, getSketchProgress, markPracticeComplete } from '../lib/storage';
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
    }, 800);
  }

  if (finished) {
    const passed = scores.filter(Boolean).length;
    return (
      <div className="practice-page">
        <Link to={`/sketch/${sketch.id}`} className="back-link">
          ← Back
        </Link>
        <div className="completion-card">
          <h2>Practice pass done.</h2>
          <p>
            {passed}/{exercises.length} exercises cleared. Jay would nod and
            hand you the next tool.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page">
      <Link to={`/sketch/${sketch.id}`} className="back-link">
        ← Back
      </Link>
      <div className="practice-header">
        <h2>{sketch.title} — Practice</h2>
        <div className="step-dots">
          {exercises.map((_, i) => (
            <span
              key={i}
              className={`step-dot${i === exerciseIndex ? ' active' : ''}${scores[i] ? ' done' : ''}`}
            />
          ))}
        </div>
      </div>

      <PracticeExerciseView
        key={exerciseIndex}
        exercise={current}
        onResult={handleResult}
      />
    </div>
  );
}
