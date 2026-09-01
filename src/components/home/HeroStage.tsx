import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sketch } from '../../types/sketch';
import type { SketchProgress } from '../../types/sketch';
import { categoryLabels } from '../../data/sketches';
import SketchVisual from '../SketchVisual';

const Scene3D = lazy(() => import('../scenes/Scene3D'));

interface Props {
  sketch: Sketch;
  progress?: SketchProgress;
}

export default function HeroStage({ sketch, progress }: Props) {
  const done = progress?.learnComplete && progress?.practiceComplete;

  return (
    <section className="hero-stage">
      <div className="hero-stage-canvas">
        {sketch.scene3d ? (
          <Suspense fallback={<div className="scene-loader"><div className="scene-loader-beam" /></div>}>
            <Scene3D sceneId={sketch.scene3d} variant="hero" interactive />
          </Suspense>
        ) : (
          <SketchVisual sketch={sketch} variant="hero" prefer3d={false} />
        )}
        <div className="hero-stage-grain" aria-hidden="true" />
        <div className="hero-stage-vignette" aria-hidden="true" />
      </div>

      <div className="hero-hud">
        <div className="hero-hud-top">
          <span className="stamp stamp--caution">{categoryLabels[sketch.category]}</span>
          {done && <span className="stamp stamp--done">CLEARED</span>}
        </div>
        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {sketch.title}
        </motion.h2>
        <motion.p
          className="hero-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {sketch.summary}
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link to={`/sketch/${sketch.id}`} className="btn btn-hero">
            Walk up to it
          </Link>
        </motion.div>
        <p className="hero-orbit-hint stamp">ORBIT · PINCH · TAP</p>
      </div>
    </section>
  );
}
