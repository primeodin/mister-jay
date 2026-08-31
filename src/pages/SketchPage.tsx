import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSketchById, categoryLabels } from '../data/sketches';
import { loadProgress, getSketchProgress } from '../lib/storage';
import type { SketchProgress } from '../types/sketch';

export default function SketchPage() {
  const { id } = useParams<{ id: string }>();
  const sketch = id ? getSketchById(id) : undefined;
  const [progress, setProgress] = useState<SketchProgress | null>(null);

  useEffect(() => {
    if (id) {
      const p = loadProgress();
      setProgress(getSketchProgress(p, id));
    }
  }, [id]);

  if (!sketch) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sketch-detail">
      <Link to="/" className="back-link">← Library</Link>
      <span className="sketch-detail-category">
        {categoryLabels[sketch.category]}
      </span>
      <h2>{sketch.title}</h2>
      <p className="sketch-detail-summary">{sketch.summary}</p>

      <div className="mode-cards">
        <Link to={`/sketch/${sketch.id}/learn`} className="mode-card">
          <span className="mode-card-icon">📖</span>
          <div>
            <h3>Learn</h3>
            <p>What you&apos;re looking at, what can hurt you, the steps.</p>
            {progress?.learnComplete && (
              <span className="mode-complete">Complete ✓</span>
            )}
          </div>
        </Link>
        <Link
          to={`/sketch/${sketch.id}/practice`}
          className={`mode-card${!progress?.learnComplete ? ' mode-card--locked' : ''}`}
        >
          <span className="mode-card-icon">🛠</span>
          <div>
            <h3>Practice</h3>
            <p>Tap parts, order steps, spot hazards — prove you got it.</p>
            {progress?.practiceComplete && (
              <span className="mode-complete">Complete ✓</span>
            )}
            {!progress?.learnComplete && (
              <span className="mode-hint">Finish Learn first</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
