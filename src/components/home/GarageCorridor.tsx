import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sketch, SketchProgress } from '../../types/sketch';
import { categoryLabels } from '../../data/sketches';

interface Props {
  sketches: Sketch[];
  progress: Record<string, SketchProgress>;
  dailyId?: string;
}

const categoryStripe: Record<Sketch['category'], string> = {
  vehicle: '#c45c26',
  electrical: '#f5c518',
  plumbing: '#4a8eb8',
  household: '#7a8a6a',
};

const categoryGlyph: Record<Sketch['category'], string> = {
  vehicle: '◈',
  electrical: '⚡',
  plumbing: '◎',
  household: '⌂',
};

export default function GarageCorridor({ sketches, progress, dailyId }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !dailyId) return;
    const dailyBay = track.querySelector(`[data-bay-id="${dailyId}"]`);
    if (dailyBay) {
      dailyBay.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }, [dailyId]);

  return (
    <section className="garage-corridor" aria-label="Shop bays">
      <div className="garage-corridor-header">
        <h3 className="garage-corridor-title stamp">WALK THE SHOP</h3>
        <p className="garage-corridor-hint stamp">SWIPE BAYS →</p>
      </div>

      <div className="garage-corridor-perspective">
        <div className="garage-corridor-floor" aria-hidden="true" />
        <div className="garage-corridor-pegboard" aria-hidden="true" />

        <div className="garage-corridor-track" ref={trackRef}>
          {sketches.map((sketch, i) => {
            const p = progress[sketch.id];
            const done = p?.learnComplete && p?.practiceComplete;
            const started = p?.learnComplete || p?.practiceComplete;
            const isDaily = sketch.id === dailyId;

            return (
              <motion.div
                key={sketch.id}
                className="garage-bay-wrap"
                data-bay-id={sketch.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link
                  to={`/sketch/${sketch.id}`}
                  className={`garage-bay${done ? ' garage-bay--done' : ''}${started ? ' garage-bay--started' : ''}${isDaily ? ' garage-bay--daily' : ''}`}
                >
                  <div
                    className="garage-bay-light"
                    style={{ background: categoryStripe[sketch.category] }}
                    aria-hidden="true"
                  />
                  <div className="garage-bay-interior">
                    <span className="garage-bay-glyph" aria-hidden="true">
                      {categoryGlyph[sketch.category]}
                    </span>
                    <span className="garage-bay-num stamp">{String(i + 1).padStart(2, '0')}</span>
                    {isDaily && <span className="garage-bay-today stamp">TODAY</span>}
                    <span className="garage-bay-cat stamp">{categoryLabels[sketch.category]}</span>
                    <span className="garage-bay-title">{sketch.title}</span>
                    <span className="garage-bay-status stamp">
                      {done ? 'CLEARED' : started ? 'IN PROGRESS' : 'OPEN'}
                    </span>
                  </div>
                  <div className="garage-bay-threshold" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
