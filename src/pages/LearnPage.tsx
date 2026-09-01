import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSketchById } from '../data/sketches';
import { markLearnComplete } from '../lib/storage';
import SketchVisual from '../components/SketchVisual';
import { playThunk } from '../lib/audio';

export default function LearnPage() {
  const { id } = useParams<{ id: string }>();
  const sketch = id ? getSketchById(id) : undefined;
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const sections = sketch?.learn ?? [];
  const current = sections[step];
  const isLast = step === sections.length - 1;

  if (!sketch) {
    return <Navigate to="/" replace />;
  }

  function handleNext() {
    if (isLast) {
      markLearnComplete(sketch!.id);
      playThunk();
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  if (finished) {
    return (
      <div className="viewport learn-viewport">
        <Link to={`/sketch/${sketch.id}`} className="viewport-back stamp">← BAY</Link>
        <motion.div
          className="completion-plate"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <span className="completion-plate-icon" aria-hidden="true">🔧</span>
          <h2>Learn cleared.</h2>
          <p>Jay would say: now practice it before you need it for real.</p>
          <Link to={`/sketch/${sketch.id}/practice`} className="btn btn-hero">Start Practice</Link>
          <Link to={`/sketch/${sketch.id}`} className="btn btn-ghost">Back to bay</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="learn-shell learn-shell--immersive"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="learn-shell-top">
        <Link to={`/sketch/${sketch.id}`} className="viewport-back stamp">← BAY</Link>
        <div className="learn-progress stamp">
          STEP {step + 1}/{sections.length}
        </div>
      </div>

      <div className="learn-shell-canvas">
        <SketchVisual
          sketch={sketch}
          variant="learn"
          focusIds={current.diagramFocus}
          highlightIds={current.diagramFocus}
        />
      </div>

      <div className="learn-bottom-dock">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="learn-sheet-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <article className="learn-sheet">
              <h3 className="learn-sheet-heading">{current.heading}</h3>
              {current.body.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {current.callout && (
                <aside className="callout callout--danger">
                  <strong className="stamp">SAFETY</strong>
                  <p>{current.callout}</p>
                </aside>
              )}
            </article>
          </motion.div>
        </AnimatePresence>

        <div className="learn-nav">
          {step > 0 && (
            <motion.button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)} whileTap={{ scale: 0.96 }}>
              Back
            </motion.button>
          )}
          <motion.button type="button" className="btn btn-hero" onClick={handleNext} whileTap={{ scale: 0.96 }}>
            {isLast ? 'Finish Learn' : 'Next step'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
