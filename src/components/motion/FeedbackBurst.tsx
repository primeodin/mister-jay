import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  show: boolean;
  success: boolean;
  message: string;
}

export default function FeedbackBurst({ show, success, message }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`feedback-burst${success ? ' feedback-burst--ok' : ' feedback-burst--err'}`}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -4 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
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
