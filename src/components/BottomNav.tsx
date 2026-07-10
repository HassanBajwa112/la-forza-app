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
    <nav className="relative shrink-0 z-50 border-t border-forza-border bg-forza-surface/95 backdrop-blur-xl">
      <div className="flex items-stretch justify-around px-1 pt-2 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1 transition-all active:scale-95"
            >
              <div
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-forza-red shadow-glow scale-105' : ''
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? 'text-forza-white' : 'text-forza-muted'}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-forza-red' : 'text-forza-muted'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pb-[max(6px,env(safe-area-inset-bottom))] pt-0.5">
        <div className="h-1 w-[120px] rounded-full bg-forza-white/20" />
      </div>
    </nav>
  );
}
