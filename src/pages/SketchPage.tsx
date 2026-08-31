import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSketchById, categoryLabels } from '../data/sketches';
import { getResourcesForSketch } from '../data/resources';
import { loadProgress, getSketchProgress } from '../lib/storage';
import type { SketchProgress } from '../types/sketch';
import PageTransition from '../components/motion/PageTransition';
import SketchVisual from '../components/SketchVisual';
import ResourcesRail from '../components/resources/ResourcesRail';
import VehiclePicker from '../components/vehicle/VehiclePicker';

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

  const resources = getResourcesForSketch(sketch.id);

  return (
    <PageTransition className="sketch-detail">
      <Link to="/" className="back-link">← Library</Link>
      <motion.div
        className="sketch-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SketchVisual sketch={sketch} />
      </motion.div>
      <span className="sketch-detail-category">
        {categoryLabels[sketch.category]}
      </span>
      <h2>{sketch.title}</h2>
      <p className="sketch-detail-summary">{sketch.summary}</p>

      {sketch.vehicleTypes && sketch.vehicleTypes.length > 0 && (
        <VehiclePicker sketchId={sketch.id} vehicleTypes={sketch.vehicleTypes} />
      )}

      <div className="mode-cards">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to={`/sketch/${sketch.id}/learn`} className="mode-card mode-card--learn">
            <span className="mode-card-icon">📖</span>
            <div>
              <h3>Learn</h3>
              <p>What you&apos;re looking at, what can hurt you, the steps.</p>
              {progress?.learnComplete && (
                <span className="mode-complete">Complete ✓</span>
              )}
            </div>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: progress?.learnComplete ? 1.02 : 1 }} whileTap={{ scale: progress?.learnComplete ? 0.98 : 1 }}>
          <Link
            to={`/sketch/${sketch.id}/practice`}
            className={`mode-card mode-card--practice${!progress?.learnComplete ? ' mode-card--locked' : ''}`}
          >
            <span className="mode-card-icon">🛠</span>
            <div>
              <h3>Practice</h3>
              <p>Tap parts on the scene, drag steps, spot hazards.</p>
              {progress?.practiceComplete && (
                <span className="mode-complete">Complete ✓</span>
              )}
              {!progress?.learnComplete && (
                <span className="mode-hint">Finish Learn first</span>
              )}
            </div>
          </Link>
        </motion.div>
      </div>

      <ResourcesRail resources={resources} />
    </PageTransition>
  );
}
