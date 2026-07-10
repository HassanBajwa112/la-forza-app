import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { springSoft } from '../motion/presets';

export function Toast() {
  const { toast } = useApp();
  const reduced = useReducedMotion();

  return (
    <div className="absolute top-14 left-4 right-4 z-[60] pointer-events-none">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast}
            className="flex items-center gap-2.5 surface-card px-4 py-3.5 border-forza-red/30 shadow-glow"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={springSoft}
          >
            <motion.span
              initial={reduced ? false : { scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...springSoft, delay: reduced ? 0 : 0.05 }}
            >
              <CheckCircle size={18} className="text-forza-red shrink-0" />
            </motion.span>
            <span className="text-forza-white text-sm font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
