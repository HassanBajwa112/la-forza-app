import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { GYM_INFO } from '../data/mockData';
import { LaForzaLogo } from '../components/LaForzaLogo';

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div className="h-full min-h-0 flex flex-col relative overflow-hidden bg-forza-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,16,11,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <div className="animate-scale-in mb-8">
          <LaForzaLogo size="xl" />
        </div>

        <h1 className="font-display text-4xl font-bold text-forza-red tracking-wide animate-slide-up" style={{ animationDelay: '0.1s' }}>
          LA FORZA
        </h1>
        <p className="text-forza-red text-sm font-medium tracking-[0.25em] uppercase mt-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {GYM_INFO.tagline}
        </p>
        <p className="text-forza-red/60 text-center text-sm mt-6 leading-relaxed max-w-[260px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Your membership. Your workouts. Your community — all in one app.
        </p>
      </div>

      <div className="relative z-10 shrink-0 px-6 pb-6 animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {['Membership', 'Events', 'Workouts'].map((f) => (
            <div key={f} className="rounded-xl border border-forza-red/15 bg-forza-white py-3 text-center">
              <p className="text-forza-red text-[11px] font-medium">{f}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold btn-primary disabled:opacity-70"
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

        <p className="mt-4 text-center text-[10px] text-forza-red/45">
          Concept mockup for {GYM_INFO.instagram}
        </p>
      </div>
    </div>
  );
}
