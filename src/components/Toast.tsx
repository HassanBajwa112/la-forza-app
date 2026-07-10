import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { springSoft } from '../motion/presets';

export function Toast() {
  const { toast } = useApp();
  const reduced = useReducedMotion();

  return (
    <div className="absolute top-3 left-4 right-4 z-[80] pointer-events-none">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast}
            className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-card-hover"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={springSoft}
          >
            <CheckCircle size={18} className="text-success-500 shrink-0" />
            <span className="text-gray-900 text-sm font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
