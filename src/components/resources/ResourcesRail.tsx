import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SketchResource } from '../../types/sketch';

interface Props {
  resources: SketchResource[];
}

export default function ResourcesRail({ resources }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (resources.length === 0) return null;

  const openResource = resources.find((r) => r.id === openId);

  return (
    <section className="resources-rail">
      <h3 className="resources-rail-title">Watch along</h3>
      <p className="resources-rail-sub">Jay would say: watch someone do it before you need it.</p>
      <div className="resources-scroll">
        {resources.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            className={`resource-card resource-card--${r.type}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setOpenId(r.id)}
          >
            <span className="resource-card-type">
              {r.type === 'video' ? '▶' : r.type === 'search' ? '🔍' : '📝'}
            </span>
            <span className="resource-card-title">{r.title}</span>
            {r.duration && <span className="resource-card-duration">{r.duration}</span>}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openResource && (
          <motion.div
            className="resource-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="resource-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resource-sheet-handle" />
              <h4>{openResource.title}</h4>
              <p className="resource-sheet-why">{openResource.why}</p>
              {openResource.type !== 'note' && (
                <a
                  href={openResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary resource-sheet-link"
                >
                  {openResource.type === 'search' ? 'Search on YouTube' : 'Watch on YouTube'}
                </a>
              )}
              <button type="button" className="btn btn-secondary" onClick={() => setOpenId(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
