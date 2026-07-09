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
    <div className="h-full min-h-0 flex flex-col bg-forza-black relative overflow-hidden">
      {/* Background — Instagram-style black + red glow */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-forza-red/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-48 h-48 bg-forza-red/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.08),transparent_55%)]" />
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <div className="animate-scale-in mb-8">
          <LaForzaLogo size="lg" />
        </div>

        <h1 className="font-display text-4xl font-bold text-white tracking-wide animate-slide-up" style={{ animationDelay: '0.1s' }}>
          LA FORZA
        </h1>
        <p className="text-forza-red text-sm font-medium tracking-[0.25em] uppercase mt-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {GYM_INFO.tagline}
        </p>
        <p className="text-forza-muted text-center text-sm mt-6 leading-relaxed max-w-[260px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Your membership. Your workouts. Your community — all in one app.
        </p>
      </div>

      {/* Features preview */}
      <div className="px-6 pb-6 relative z-10 animate-slide-up shrink-0" style={{ animationDelay: '0.25s' }}>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {['Membership', 'Events', 'Workouts'].map((f) => (
            <div key={f} className="bg-forza-card/80 border border-forza-border rounded-xl py-3 text-center">
              <p className="text-white text-[11px] font-medium">{f}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={loading}
          className="w-full btn-primary rounded-2xl py-4 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Enter Member Portal
              <ChevronRight size={20} />
            </>
          )}
        </button>

        <p className="text-forza-subtle text-[10px] text-center mt-4">
          Concept mockup for {GYM_INFO.instagram}
        </p>
      </div>
    </div>
  );
}
