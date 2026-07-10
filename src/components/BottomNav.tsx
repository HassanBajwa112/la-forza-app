import { Home, Calendar, Dumbbell, CreditCard, User } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { springSnappy } from '../motion/presets';

export type Tab = 'home' | 'membership' | 'events' | 'workout' | 'profile';

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'membership', label: 'Plan', icon: CreditCard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'workout', label: 'Train', icon: Dumbbell },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const reduced = useReducedMotion();

  return (
    <nav className="relative shrink-0 z-50 border-t border-forza-border bg-forza-surface/95 backdrop-blur-xl">
      <div className="flex items-stretch justify-around px-1 pt-2 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1"
              whileTap={reduced ? undefined : { scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute top-0.5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl bg-forza-red shadow-glow"
                  transition={reduced ? { duration: 0 } : springSnappy}
                />
              )}
              <div className="relative z-10 p-2">
                <Icon
                  size={22}
                  className={isActive ? 'text-forza-white' : 'text-forza-muted'}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>
              <motion.span
                className={`relative z-10 text-[10px] font-semibold uppercase tracking-wide ${
                  isActive ? 'text-forza-red' : 'text-forza-muted'
                }`}
                animate={{ opacity: isActive ? 1 : 0.85 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center pb-[max(6px,env(safe-area-inset-bottom))] pt-0.5">
        <div className="h-1 w-[120px] rounded-full bg-forza-white/20" />
      </div>
    </nav>
  );
}
