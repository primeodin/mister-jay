import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playFail, playSpark, playSuccess, playThunk } from '../../lib/audio';

interface Props {
  show: boolean;
  success: boolean;
  message: string;
  shake?: boolean;
}

export default function FeedbackBurst({ show, success, message, shake }: Props) {
  useEffect(() => {
    if (!show) return;
    if (success) {
      playSuccess();
      playThunk();
    } else {
      playFail();
      playSpark();
    }
  }, [show, success]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`feedback-burst${success ? ' feedback-burst--ok' : ' feedback-burst--err'}`}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: shake && !success ? [0, -6, 6, -4, 4, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 480, damping: 24 }}
        >
          <span className="feedback-burst-icon" aria-hidden="true">
            {success ? '✓' : '✕'}
          </span>
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
