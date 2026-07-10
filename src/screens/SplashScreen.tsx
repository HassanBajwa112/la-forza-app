import { useState } from 'react';
import { ChevronRight, Dumbbell, Calendar, CreditCard, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { GYM_INFO } from '../data/mockData';
import { LaForzaLogo } from '../components/LaForzaLogo';
import { Stagger, StaggerItem } from '../components/motion';
import { springSoft, scaleIn } from '../motion/presets';

const features = [
  { icon: CreditCard, label: 'Membership' },
  { icon: Calendar, label: 'Events' },
  { icon: Dumbbell, label: 'Workouts' },
];

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [loading, setLoading] = useState(false);
  const reduced = useReducedMotion();

  const handleEnter = () => {
    setLoading(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div className="h-full min-h-0 flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img src="/gym-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-b from-forza-ink/90 via-forza-ink/75 to-forza-ink/95" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(224,30,30,0.18),transparent_55%)]"
          animate={reduced ? undefined : { opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8">
        <motion.div
          className="mb-7"
          initial={reduced ? false : scaleIn.hidden}
          animate={scaleIn.visible}
          transition={springSoft}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LaForzaLogo size="xl" />
          </motion.div>
        </motion.div>

        <Stagger className="flex flex-col items-center">
          <StaggerItem>
            <p className="label-caps">Member Portal</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[2.6rem] font-bold text-forza-white uppercase tracking-wide text-center leading-[0.95] mt-2">
              Strength.
              <br />
              Discipline.
              <br />
              <span className="text-forza-red">Power.</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-forza-muted text-center text-sm mt-5 leading-relaxed max-w-[280px]">
              {GYM_INFO.tagline} — your membership, workouts & community in one place.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="trust-strip mt-6">
              <MapPin size={11} className="text-forza-red" />
              <span className="text-[10px] font-bold text-forza-muted uppercase tracking-wide">
                Sector F · Bahria Town, Lahore
              </span>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <Stagger className="relative z-10 shrink-0 px-6 pb-6">
        <StaggerItem>
          <div className="mb-5 grid grid-cols-3 gap-2">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="surface-card py-3.5 text-center">
                <Icon size={18} className="text-forza-red mx-auto" />
                <p className="label-caps-muted mt-2">{label}</p>
              </div>
            ))}
          </div>
        </StaggerItem>
        <StaggerItem>
          <motion.button
            type="button"
            onClick={handleEnter}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm btn-primary disabled:opacity-70"
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-forza-white/30 border-t-forza-white" />
              ) : (
                <>
                  Enter Member Portal
                  <motion.span
                    animate={reduced ? undefined : { x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronRight size={20} />
                  </motion.span>
                </>
              )}
          </motion.button>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 text-center text-[10px] text-forza-muted font-medium">
            {GYM_INFO.instagram} · Concept mockup
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
