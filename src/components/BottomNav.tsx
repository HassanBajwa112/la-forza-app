import { Home, Calendar, Dumbbell, CreditCard, User } from 'lucide-react';

export type Tab = 'home' | 'membership' | 'events' | 'workout' | 'profile';

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'membership', label: 'Plan', icon: CreditCard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'workout', label: 'Train', icon: Dumbbell },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="shrink-0 z-50 bg-forza-dark/98 backdrop-blur-xl border-t border-forza-border safe-bottom">
      <div className="flex items-stretch justify-around px-1 pt-2 pb-3">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 transition-all active:scale-95"
            >
              <div
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-forza-red/15 scale-105' : ''
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? 'text-forza-red' : 'text-forza-subtle'}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-forza-red' : 'text-forza-subtle'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-forza-red mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
