import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sketches } from '../data/sketches';
import { getDailySketchIndex } from '../lib/practiceLogic';
import { loadProgress, completedCount } from '../lib/storage';
import type { AppProgress } from '../types/sketch';
import SketchCard from '../components/SketchCard';
import PageTransition from '../components/motion/PageTransition';

export default function Home() {
  const [progress, setProgress] = useState<AppProgress>(() => loadProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const dailyIndex = getDailySketchIndex(sketches.length);
  const dailySketch = sketches[dailyIndex];
  const completed = completedCount(progress);

  return (
    <PageTransition className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>What Jay taught, you can practice.</h2>
        <p>
          Stand in front of the real thing. Look first, watch for what can hurt
          you, then do the steps.
        </p>
        <div className="stats">
          <motion.div
            className="stat stat--streak"
            whileHover={{ scale: 1.05 }}
            key={progress.streak}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            <span className="stat-value">{progress.streak}</span>
            <span className="stat-label">day streak</span>
          </motion.div>
          <motion.div className="stat" whileHover={{ scale: 1.05 }}>
            <span className="stat-value">{completed}/{sketches.length}</span>
            <span className="stat-label">complete</span>
          </motion.div>
        </div>
      </motion.section>

      <section className="section">
        <h3 className="section-title">Today&apos;s sketch</h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
        >
          <SketchCard
            sketch={dailySketch}
            progress={progress.sketches[dailySketch.id]}
            highlight
          />
        </motion.div>
      </section>

      <section className="section">
        <h3 className="section-title">All sketches</h3>
        <div className="sketch-grid">
          {sketches.map((sketch, i) => (
            <motion.div
              key={sketch.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <SketchCard
                sketch={sketch}
                progress={progress.sketches[sketch.id]}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
