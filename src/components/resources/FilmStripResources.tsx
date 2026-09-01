import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SketchResource } from '../../types/sketch';

interface Props {
  resources: SketchResource[];
}

export default function FilmStripResources({ resources }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (resources.length === 0) return null;

  const openResource = resources.find((r) => r.id === openId);

  return (
    <section className="filmstrip">
      <div className="filmstrip-header">
        <h3 className="stamp">WATCH ALONG</h3>
        <p>Jay would send you to the garage with these.</p>
      </div>
      <div className="filmstrip-track">
        {resources.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            className="film-frame"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpenId(r.id)}
          >
            <div className="film-frame-thumb">
              <span className="film-play" aria-hidden="true">▶</span>
            </div>
            <span className="film-frame-title">{r.title}</span>
            <span className="stamp film-frame-type">{r.type === 'search' ? 'YOUTUBE' : 'VIDEO'}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openResource && (
          <motion.div
            className="film-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="film-drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="film-drawer-grab" />
              <span className="stamp film-drawer-label">WHY JAY WOULD SEND YOU</span>
              <h4>{openResource.title}</h4>
              <p className="film-drawer-why">{openResource.why}</p>
              {openResource.type !== 'note' && (
                <a
                  href={openResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-hero film-drawer-link"
                >
                  Search on YouTube
                </a>
              )}
              <button type="button" className="btn btn-ghost" onClick={() => setOpenId(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
