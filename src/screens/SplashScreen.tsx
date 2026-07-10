import { useState } from 'react';
import { ChevronRight, Dumbbell, Calendar, CreditCard, MapPin } from 'lucide-react';
import { GYM_INFO } from '../data/mockData';
import { LaForzaLogo } from '../components/LaForzaLogo';

const features = [
  { icon: CreditCard, label: 'Membership' },
  { icon: Calendar, label: 'Events' },
  { icon: Dumbbell, label: 'Workouts' },
];

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div className="h-full min-h-0 flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img src="/gym-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-forza-ink/90 via-forza-ink/75 to-forza-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(224,30,30,0.18),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <div className="animate-scale-in mb-7">
          <LaForzaLogo size="xl" />
        </div>

        <p className="label-caps animate-slide-up" style={{ animationDelay: '0.08s' }}>
          Member Portal
        </p>
        <h1
          className="font-display text-[2.6rem] font-bold text-forza-white uppercase tracking-wide text-center leading-[0.95] mt-2 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          Strength.
          <br />
          Discipline.
          <br />
          <span className="text-forza-red">Power.</span>
        </h1>
        <p
          className="text-forza-muted text-center text-sm mt-5 leading-relaxed max-w-[280px] animate-slide-up"
          style={{ animationDelay: '0.18s' }}
        >
          {GYM_INFO.tagline} — your membership, workouts & community in one place.
        </p>

        <div className="trust-strip mt-6 animate-slide-up" style={{ animationDelay: '0.22s' }}>
          <MapPin size={11} className="text-forza-red" />
          <span className="text-[10px] font-bold text-forza-muted uppercase tracking-wide">
            Sector F · Bahria Town, Lahore
          </span>
        </div>
      </div>

      <div className="relative z-10 shrink-0 px-6 pb-6 animate-slide-up" style={{ animationDelay: '0.28s' }}>
        <div className="mb-5 grid grid-cols-3 gap-2">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="surface-card py-3.5 text-center">
              <Icon size={18} className="text-forza-red mx-auto" />
              <p className="label-caps-muted mt-2">{label}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm btn-primary disabled:opacity-70"
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-forza-white/30 border-t-forza-white" />
          ) : (
            <>
              Enter Member Portal
              <ChevronRight size={20} />
            </>
          )}
        </button>

        <p className="mt-4 text-center text-[10px] text-forza-muted font-medium">
          {GYM_INFO.instagram} · Concept mockup
        </p>
      </div>
    </div>
  );
}
