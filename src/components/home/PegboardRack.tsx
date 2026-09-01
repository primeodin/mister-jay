import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sketch, SketchProgress } from '../../types/sketch';
import { categoryLabels } from '../../data/sketches';

interface Props {
  sketches: Sketch[];
  progress: Record<string, SketchProgress>;
  excludeId?: string;
}

const categoryStripe: Record<Sketch['category'], string> = {
  vehicle: '#c45c26',
  electrical: '#f5c518',
  plumbing: '#4a8eb8',
  household: '#7a8a6a',
};

export default function PegboardRack({ sketches, progress, excludeId }: Props) {
  const items = sketches.filter((s) => s.id !== excludeId);

  return (
    <section className="pegboard">
      <div className="pegboard-rail" aria-hidden="true" />
      <h3 className="pegboard-title stamp">THE RACK — ALL BAYS</h3>
      <div className="pegboard-list">
        {items.map((sketch, i) => {
          const p = progress[sketch.id];
          const done = p?.learnComplete && p?.practiceComplete;
          const started = p?.learnComplete || p?.practiceComplete;

          return (
            <motion.div
              key={sketch.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            >
              <Link to={`/sketch/${sketch.id}`} className={`bay-plate${done ? ' bay-plate--done' : ''}${started ? ' bay-plate--started' : ''}`}>
                <span
                  className="bay-stripe"
                  style={{ background: categoryStripe[sketch.category] }}
                  aria-hidden="true"
                />
                <div className="bay-body">
                  <span className="bay-num stamp">{String(i + 1).padStart(2, '0')}</span>
                  <div className="bay-text">
                    <span className="bay-cat stamp">{categoryLabels[sketch.category]}</span>
                    <span className="bay-title">{sketch.title}</span>
                  </div>
                  <span className="bay-status stamp">
                    {done ? '✓' : started ? '◐' : '○'}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
