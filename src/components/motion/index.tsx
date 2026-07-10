import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, springSoft } from '../../motion/presets';

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className = '' }: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.055,
            delayChildren: reduced ? 0 : 0.03,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : fadeUp.hidden.y },
        visible: {
          opacity: 1,
          y: 0,
          transition: springSoft,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type PressableProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'div';
};

/** Subtle press/hover feedback for cards and actions. */
export function Pressable({ children, className = '', onClick, type = 'div' }: PressableProps) {
  const reduced = useReducedMotion();
  const Component = type === 'button' ? motion.button : motion.div;

  return (
    <Component
      type={type === 'button' ? 'button' : undefined}
      className={className}
      onClick={onClick}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      whileHover={reduced ? undefined : { scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {children}
    </Component>
  );
}

type AnimatedBarProps = {
  value: number;
  className?: string;
};

export function AnimatedBar({ value, className = '' }: AnimatedBarProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`h-full rounded-full bg-gradient-to-r from-forza-red-deep to-forza-red shadow-glow ${className}`}
      initial={{ width: reduced ? `${value}%` : 0 }}
      animate={{ width: `${value}%` }}
      transition={reduced ? { duration: 0 } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

type AnimatedNumberProps = {
  value: number;
  className?: string;
};

export function AnimatedNumber({ value, className = '' }: AnimatedNumberProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={className}
      key={value}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSoft}
    >
      {value}
    </motion.span>
  );
}
