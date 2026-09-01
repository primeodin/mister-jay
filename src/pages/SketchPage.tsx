import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSketchById, categoryLabels } from '../data/sketches';
import { getResourcesForSketch } from '../data/resources';
import { loadProgress, getSketchProgress } from '../lib/storage';
import type { SketchProgress } from '../types/sketch';
import SketchVisual from '../components/SketchVisual';
import FilmStripResources from '../components/resources/FilmStripResources';
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
    <motion.div
      className="viewport"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/" className="viewport-back stamp">← RACK</Link>

      <div className="viewport-stage">
        <SketchVisual sketch={sketch} variant="viewport" />
        <div className="viewport-overlay">
          <span className="stamp stamp--caution">{categoryLabels[sketch.category]}</span>
          <h1 className="viewport-title">{sketch.title}</h1>
          <p className="viewport-summary">{sketch.summary}</p>
        </div>
      </div>

      {sketch.vehicleTypes && sketch.vehicleTypes.length > 0 && (
        <VehiclePicker sketchId={sketch.id} vehicleTypes={sketch.vehicleTypes} />
      )}

      <div className="viewport-actions">
        <Link to={`/sketch/${sketch.id}/learn`} className="btn btn-hero btn-hero--learn">
          <span className="btn-label">Learn</span>
          <span className="btn-sub">Look · Hazards · Steps</span>
          {progress?.learnComplete && <span className="btn-badge stamp">DONE</span>}
        </Link>
        <Link
          to={`/sketch/${sketch.id}/practice`}
          className={`btn btn-hero btn-hero--practice${!progress?.learnComplete ? ' btn-hero--locked' : ''}`}
        >
          <span className="btn-label">Practice</span>
          <span className="btn-sub">Tap · Drag · Spot</span>
          {progress?.practiceComplete && <span className="btn-badge stamp">DONE</span>}
          {!progress?.learnComplete && <span className="btn-lock stamp">LEARN FIRST</span>}
        </Link>
      </div>

      <FilmStripResources resources={resources} />
    </motion.div>
  );
}
