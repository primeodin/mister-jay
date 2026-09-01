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

  if (!sketch) {
    return <Navigate to="/" replace />;
  }

  const sections = sketch.learn;
  const current = sections[step];
  const isLast = step === sections.length - 1;

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
      className="viewport learn-viewport"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to={`/sketch/${sketch.id}`} className="viewport-back stamp">← BAY</Link>
      <div className="learn-progress stamp">
        STEP {step + 1}/{sections.length}
      </div>

      <SketchVisual
        sketch={sketch}
        variant="viewport"
        focusIds={current.diagramFocus}
        highlightIds={current.diagramFocus}
      />

      <AnimatePresence mode="wait">
        <motion.article
          key={step}
          className="callout-plate"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="callout-plate-heading">{current.heading}</h3>
          {current.body.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          {current.callout && (
            <aside className="callout callout--danger">
              <strong className="stamp">SAFETY</strong>
              <p>{current.callout}</p>
            </aside>
          )}
        </motion.article>
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
    </motion.div>
  );
}
