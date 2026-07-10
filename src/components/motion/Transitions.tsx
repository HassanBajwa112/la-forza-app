import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { springSnappy, tabPanelVariants } from '../../motion/presets';

type TabTransitionProps = {
  tabKey: string;
  direction: number;
  children: ReactNode;
};

export function TabTransition({ tabKey, direction, children }: TabTransitionProps) {
  const reduced = useReducedMotion();
  const variants = tabPanelVariants(direction, !!reduced);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={tabKey}
        className="relative h-full min-h-0 flex flex-col"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={reduced ? { duration: 0.15 } : springSnappy}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

type AnimatedModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  tall?: boolean;
};

export function AnimatedModal({ open, onClose, title, children, tall }: AnimatedModalProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[70] flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-forza-ink/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative w-full bg-forza-surface rounded-t-3xl p-5 border-t border-forza-border ${
              tall ? 'max-h-[75%] overflow-y-auto scroll-area' : ''
            }`}
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={reduced ? { duration: 0.15 } : springSnappy}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-forza-white">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-forza-elevated flex items-center justify-center text-forza-muted"
              >
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
