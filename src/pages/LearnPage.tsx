import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSketchById } from '../data/sketches';
import { getResourcesForSketch } from '../data/resources';
import { markLearnComplete } from '../lib/storage';
import PageTransition from '../components/motion/PageTransition';
import SketchVisual from '../components/SketchVisual';
import ResourcesRail from '../components/resources/ResourcesRail';

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
  const resources = getResourcesForSketch(sketch.id);

  function handleNext() {
    if (isLast) {
      markLearnComplete(sketch!.id);
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  if (finished) {
    return (
      <PageTransition className="learn-page">
        <Link to={`/sketch/${sketch.id}`} className="back-link">← Back</Link>
        <motion.div
          className="completion-card completion-card--celebrate"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <motion.span
            className="completion-spark"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: 2, duration: 0.5 }}
            aria-hidden="true"
          >
            🔧
          </motion.span>
          <h2>Learn pass done.</h2>
          <p>Jay would say: now go practice it before you need it for real.</p>
          <Link to={`/sketch/${sketch.id}/practice`} className="btn btn-primary">
            Start Practice
          </Link>
          <Link to={`/sketch/${sketch.id}`} className="btn btn-secondary">
            Back to sketch
          </Link>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="learn-page">
      <Link to={`/sketch/${sketch.id}`} className="back-link">← Back</Link>
      <div className="learn-header">
        <h2>{sketch.title}</h2>
        <div className="step-dots">
          {sections.map((_, i) => (
            <motion.span
              key={i}
              className={`step-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
              animate={i === step ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <SketchVisual
        sketch={sketch}
        focusIds={current.diagramFocus}
        highlightIds={current.diagramFocus}
      />

      <AnimatePresence mode="wait">
        <motion.article
          key={step}
          className="learn-card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>{current.heading}</h3>
          {current.body.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          {current.callout && (
            <motion.aside
              className="callout"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Safety</strong>
              <p>{current.callout}</p>
            </motion.aside>
          )}
        </motion.article>
      </AnimatePresence>

      <div className="learn-nav">
        {step > 0 && (
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStep(step - 1)}
            whileTap={{ scale: 0.96 }}
          >
            Previous
          </motion.button>
        )}
        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={handleNext}
          whileTap={{ scale: 0.96 }}
        >
          {isLast ? 'Finish Learn' : 'Next'}
        </motion.button>
      </div>

      <ResourcesRail resources={resources} />
    </PageTransition>
  );
}
