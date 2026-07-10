import { Home, Calendar, Dumbbell, CreditCard, User, ShoppingBag } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export type Tab = 'home' | 'membership' | 'events' | 'shop' | 'workout' | 'profile';

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'membership', label: 'Plan', icon: CreditCard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'workout', label: 'Train', icon: Dumbbell },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const reduced = useReducedMotion();

  return (
    <nav className="relative shrink-0 z-50 border-t border-forza-border bg-forza-surface/95 backdrop-blur-xl">
      <div className="flex items-end justify-between px-1 pt-2 pb-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-1 flex-col items-center justify-end gap-1 py-1 min-w-0"
              whileTap={reduced ? undefined : { scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isActive ? 'bg-forza-red shadow-glow' : ''
                }`}
                animate={isActive && !reduced ? { scale: 1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-forza-white' : 'text-forza-muted'}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </motion.div>
              <span
                className={`text-[9px] font-semibold uppercase tracking-wide truncate max-w-full px-0.5 ${
                  isActive ? 'text-forza-red' : 'text-forza-muted'
                }`}
              >
                {label}
              </span>
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
