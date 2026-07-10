import type { Transition } from 'framer-motion';

/** Shared motion tokens — snappy but soft, mobile-first. */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.75,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
  mass: 0.85,
};

export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const TAB_ORDER = ['home', 'membership', 'events', 'shop', 'workout', 'profile'] as const;

export function tabDirection(from: string, to: string): number {
  const a = TAB_ORDER.indexOf(from as (typeof TAB_ORDER)[number]);
  const b = TAB_ORDER.indexOf(to as (typeof TAB_ORDER)[number]);
  if (a < 0 || b < 0 || a === b) return 0;
  return b > a ? 1 : -1;
}

export function tabPanelVariants(direction: number, reduced: boolean) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  const x = direction * 18;
  return {
    initial: { opacity: 0, x, y: 6 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -x * 0.6, y: -4 },
  };
}
