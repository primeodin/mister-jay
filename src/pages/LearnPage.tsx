import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getSketchById } from '../data/sketches';
import { markLearnComplete } from '../lib/storage';

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
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  }

  if (finished) {
    return (
      <div className="learn-page">
        <Link to={`/sketch/${sketch.id}`} className="back-link">
          ← Back
        </Link>
        <div className="completion-card">
          <h2>Learn pass done.</h2>
          <p>Jay would say: now go practice it before you need it for real.</p>
          <Link to={`/sketch/${sketch.id}/practice`} className="btn btn-primary">
            Start Practice
          </Link>
          <Link to={`/sketch/${sketch.id}`} className="btn btn-secondary">
            Back to sketch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-page">
      <Link to={`/sketch/${sketch.id}`} className="back-link">
        ← Back
      </Link>
      <div className="learn-header">
        <h2>{sketch.title}</h2>
        <div className="step-dots">
          {sections.map((_, i) => (
            <span
              key={i}
              className={`step-dot${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
            />
          ))}
        </div>
      </div>

      <article className="learn-card">
        <h3>{current.heading}</h3>
        {current.body.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {current.callout && (
          <aside className="callout">
            <strong>Safety</strong>
            <p>{current.callout}</p>
          </aside>
        )}
      </article>

      <div className="learn-nav">
        {step > 0 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </button>
        )}
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          {isLast ? 'Finish Learn' : 'Next'}
        </button>
      </div>
    </div>
  );
}
