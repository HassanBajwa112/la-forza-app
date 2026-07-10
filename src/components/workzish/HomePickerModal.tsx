import { Calendar, FileText, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { springSnappy } from '../../motion/presets';
import type { OverlayScreen } from './MemberShell';

type HomePickerModalProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (screen: OverlayScreen) => void;
};

const options = [
  {
    id: 'book-now' as const,
    title: 'Space Booking',
    desc: 'Book a court, room or facility',
    icon: FileText,
    color: 'bg-brand-50 text-brand-500',
  },
  {
    id: 'class-reserve' as const,
    title: 'Class Reservation',
    desc: 'Reserve a spot in a class',
    icon: Calendar,
    color: 'bg-success-50 text-success-600',
  },
  {
    id: 'contact' as const,
    title: 'Contact Us',
    desc: 'Get in touch with the team',
    icon: MapPin,
    color: 'bg-gray-100 text-gray-600',
  },
];

export function HomePickerModal({ open, onClose, onNavigate }: HomePickerModalProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-[70] flex items-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close" className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
          <motion.div
            className="relative w-full rounded-t-3xl border-t border-gray-200 bg-white p-5 max-h-[80%] overflow-y-auto scroll-area"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={reduced ? { duration: 0.15 } : springSnappy}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Where would you like to go?</h2>
              <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {options.map(({ id, title, desc, icon: Icon, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { onNavigate(id); onClose(); }}
                  className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 p-4 text-left hover:border-brand-300 hover:shadow-card transition-all"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
