import { useEffect, useState } from 'react';
import { sketches } from '../data/sketches';
import { getDailySketchIndex } from '../lib/practiceLogic';
import { loadProgress, completedCount } from '../lib/storage';
import type { AppProgress } from '../types/sketch';
import SketchCard from '../components/SketchCard';

export default function Home() {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const dailyIndex = getDailySketchIndex(sketches.length);
  const dailySketch = sketches[dailyIndex];
  const completed = completedCount(progress);

  return (
    <div className="home">
      <section className="hero">
        <h2>What Jay taught, you can practice.</h2>
        <p>
          Vehicle, electrical, plumbing, household — look first, watch for what
          can hurt you, then do the steps.
        </p>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{progress.streak}</span>
            <span className="stat-label">day streak</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completed}/{sketches.length}</span>
            <span className="stat-label">complete</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">Today&apos;s sketch</h3>
        <SketchCard
          sketch={dailySketch}
          progress={progress.sketches[dailySketch.id]}
          highlight
        />
      </section>

      <section className="section">
        <h3 className="section-title">All sketches</h3>
        <div className="sketch-grid">
          {sketches.map((sketch) => (
            <SketchCard
              key={sketch.id}
              sketch={sketch}
              progress={progress.sketches[sketch.id]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
