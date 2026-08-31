import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sketch } from '../types/sketch';
import type { SketchProgress } from '../types/sketch';
import { categoryLabels } from '../data/sketches';
import { DiagramRenderer } from './diagrams/DiagramRenderer';

interface SketchCardProps {
  sketch: Sketch;
  progress?: SketchProgress;
  highlight?: boolean;
}

export default function SketchCard({
  sketch,
  progress,
  highlight,
}: SketchCardProps) {
  const done =
    progress?.learnComplete && progress?.practiceComplete;

  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      <Link
        to={`/sketch/${sketch.id}`}
        className={`sketch-card${highlight ? ' sketch-card--highlight' : ''}${done ? ' sketch-card--done' : ''}`}
      >
        <div className="sketch-card-thumb">
          <DiagramRenderer diagramId={sketch.diagramId} />
        </div>
        {highlight && <span className="sketch-card-badge">Today</span>}
      <span className="sketch-card-category">
        {categoryLabels[sketch.category]}
      </span>
      <h3 className="sketch-card-title">{sketch.title}</h3>
      <p className="sketch-card-summary">{sketch.summary}</p>
      <div className="sketch-card-progress">
        <span className={progress?.learnComplete ? 'done' : ''}>
          Learn {progress?.learnComplete ? '✓' : '○'}
        </span>
        <span className={progress?.practiceComplete ? 'done' : ''}>
          Practice {progress?.practiceComplete ? '✓' : '○'}
        </span>
      </div>
      </Link>
    </motion.div>
  );
}
