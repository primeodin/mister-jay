import { useRef, useEffect, type CSSProperties } from 'react';
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
      <div className="garage-corridor-ambient" aria-hidden="true">
        <div className="garage-corridor-ceiling" />
        <div className="garage-corridor-aisle-floor" />
      </div>

      <div className="garage-corridor-header">
        <h3 className="garage-corridor-title stamp">WALK THE SHOP</h3>
        <p className="garage-corridor-hint stamp">SWIPE INTO BAYS →</p>
      </div>

      <div className="garage-corridor-track" ref={trackRef}>
        {sketches.map((sketch, i) => {
          const p = progress[sketch.id];
          const done = p?.learnComplete && p?.practiceComplete;
          const started = p?.learnComplete || p?.practiceComplete;
          const isDaily = sketch.id === dailyId;

          return (
            <motion.div
              key={sketch.id}
              className="garage-stall-wrap"
              data-bay-id={sketch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            >
              <Link
                to={`/sketch/${sketch.id}`}
                className={`garage-stall${done ? ' garage-stall--done' : ''}${started ? ' garage-stall--started' : ''}${isDaily ? ' garage-stall--daily' : ''}`}
                style={{ '--bay-accent': categoryStripe[sketch.category] } as CSSProperties}
              >
                <div className="garage-stall-frame" aria-hidden="true">
                  <span className="garage-stall-jamb garage-stall-jamb--left" />
                  <span className="garage-stall-lintel" />
                  <span className="garage-stall-jamb garage-stall-jamb--right" />
                </div>
                <div className="garage-stall-ramp" aria-hidden="true" />
                <div className="garage-stall-backwall" aria-hidden="true" />
                <div className="garage-stall-content">
                  <span className="garage-stall-num stamp">{String(i + 1).padStart(2, '0')}</span>
                  {isDaily && <span className="garage-stall-today stamp">TODAY</span>}
                  <span className="garage-stall-cat stamp">{categoryLabels[sketch.category]}</span>
                  <span className="garage-stall-title">{sketch.title}</span>
                  <span className="garage-stall-status stamp">
                    {done ? 'CLEARED' : started ? 'IN PROGRESS' : 'STEP IN →'}
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
