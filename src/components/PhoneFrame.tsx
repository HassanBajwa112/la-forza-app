import type { ReactNode } from 'react';
import { LaForzaLogo } from './LaForzaLogo';
import { AppBackground } from './AppBackground';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-forza-white p-0 sm:p-6 lg:p-10">
      {/* Desktop presentation header */}
      <div className="hidden lg:flex fixed top-8 left-8 right-8 items-center justify-between z-50 pointer-events-none">
        <div className="flex items-center gap-3">
          <LaForzaLogo size="sm" showRing={false} />
          <div>
            <p className="text-forza-red/50 text-xs uppercase tracking-[0.3em]">Client Presentation</p>
            <p className="text-forza-red text-lg font-display font-semibold mt-1">La Forza Member App</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-forza-red/8 text-forza-red text-xs font-medium border border-forza-red/20">
            Interactive Prototype
          </span>
          <span className="text-forza-red/50 text-xs">v1.2</span>
        </div>
      </div>

      {/* Phone device */}
      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:rounded-[2.75rem] sm:border-[3px] sm:border-forza-red/20 bg-forza-white overflow-hidden sm:card-glow flex flex-col">
        <AppBackground />

        {/* Notch - desktop only */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-forza-red rounded-b-2xl z-50" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-11 z-40 flex items-end justify-between px-7 pb-1 bg-gradient-to-b from-forza-white/95 to-transparent">
          <span className="text-forza-red text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px]">
              {[3, 3, 2, 1].map((h, i) => (
                <div key={i} className="w-[3px] bg-forza-red rounded-sm" style={{ height: h * 3 }} />
              ))}
            </div>
            <div className="w-6 h-3 border border-forza-red/80 rounded-[3px] relative ml-1">
              <div className="absolute inset-[2px] right-[3px] bg-forza-red/90 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="relative z-10 flex-1 min-h-0 pt-11 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
