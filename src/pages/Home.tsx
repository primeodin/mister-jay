import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sketches } from '../data/sketches';
import { getDailySketchIndex } from '../lib/practiceLogic';
import { loadProgress, completedCount } from '../lib/storage';
import type { AppProgress } from '../types/sketch';
import HeroStage from '../components/home/HeroStage';
import PegboardRack from '../components/home/PegboardRack';

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
      <HeroStage
        sketch={dailySketch}
        progress={progress.sketches[dailySketch.id]}
      />

      <div className="home-stats-bar">
        <motion.div
          className="hud-stat"
          key={progress.streak}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
        >
          <span className="hud-stat-num">{progress.streak}</span>
          <span className="stamp">STREAK</span>
        </motion.div>
        <div className="hud-stat">
          <span className="hud-stat-num">{completed}<span className="hud-stat-dim">/{sketches.length}</span></span>
          <span className="stamp">CLEARED</span>
        </div>
      </div>

      <PegboardRack
        sketches={sketches}
        progress={progress.sketches}
        excludeId={dailySketch.id}
      />
    </div>
  );
}
