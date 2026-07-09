import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  DEFAULT_ADDONS,
  DEFAULT_WEEKLY_PLAN,
  EVENTS,
  type AddOn,
  type DayPlan,
  type GymEvent,
  type Subscription,
  type Tier,
  type Trainer,
  type WorkoutSet,
  WORKOUT_TEMPLATES,
} from '../data/mockData';

interface AppState {
  subscription: Subscription;
  addOns: AddOn[];
  events: GymEvent[];
  weeklyPlan: DayPlan[];
  assignedTrainer: Trainer | null;
  showToast: (msg: string) => void;
  toast: string | null;
  freezeSubscription: (until: string) => void;
  unfreezeSubscription: () => void;
  upgradeTier: (tier: Tier) => void;
  toggleAddOn: (id: string) => void;
  assignTrainer: (trainer: Trainer) => void;
  toggleEventRegistration: (id: string) => void;
  addSetToDay: (dayIndex: number, set: WorkoutSet) => void;
  removeSetFromDay: (dayIndex: number, setId: string) => void;
  moveSetToDay: (fromDay: number, toDay: number, setId: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription>({
    tier: 'essentials',
    startDate: '2025-07-10',
    endDate: '2026-07-10',
    isFrozen: false,
    monthlyPrice: 8500,
  });
  const [addOns, setAddOns] = useState<AddOn[]>(DEFAULT_ADDONS);
  const [events, setEvents] = useState<GymEvent[]>(EVENTS);
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>(
    DEFAULT_WEEKLY_PLAN.map((d) => ({ ...d, sets: [...d.sets] }))
  );
  const [assignedTrainer, setAssignedTrainer] = useState<Trainer | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const freezeSubscription = useCallback((until: string) => {
    setSubscription((s) => ({ ...s, isFrozen: true, frozenUntil: until }));
    showToast('Membership frozen successfully');
  }, [showToast]);

  const unfreezeSubscription = useCallback(() => {
    setSubscription((s) => ({ ...s, isFrozen: false, frozenUntil: undefined }));
    showToast('Membership reactivated');
  }, [showToast]);

  const upgradeTier = useCallback((tier: Tier) => {
    const prices = { essentials: 8500, elite: 12500 };
    setSubscription((s) => ({ ...s, tier, monthlyPrice: prices[tier] }));
    showToast(tier === 'elite' ? 'Upgraded to Elite!' : 'Switched to Essentials');
  }, [showToast]);

  const toggleAddOn = useCallback((id: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    const addon = addOns.find((a) => a.id === id);
    showToast(addon?.active ? `${addon.name} removed` : `${addon?.name} activated!`);
  }, [addOns, showToast]);

  const assignTrainer = useCallback((trainer: Trainer) => {
    setAssignedTrainer(trainer);
    setAddOns((prev) => prev.map((a) => (a.id === 'pt' ? { ...a, active: true } : a)));
    showToast(`${trainer.name} is now your trainer`);
  }, [showToast]);

  const toggleEventRegistration = useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: !e.registered } : e))
    );
    const ev = events.find((e) => e.id === id);
    showToast(ev?.registered ? 'Registration cancelled' : 'You\'re registered!');
  }, [events, showToast]);

  const addSetToDay = useCallback((dayIndex: number, set: WorkoutSet) => {
    setWeeklyPlan((prev) =>
      prev.map((d, i) =>
        i === dayIndex && !d.sets.find((s) => s.id === set.id)
          ? { ...d, sets: [...d.sets, set] }
          : d
      )
    );
    showToast(`${set.name} added to ${DEFAULT_WEEKLY_PLAN[dayIndex].shortDay}`);
  }, [showToast]);

  const removeSetFromDay = useCallback((dayIndex: number, setId: string) => {
    setWeeklyPlan((prev) =>
      prev.map((d, i) =>
        i === dayIndex ? { ...d, sets: d.sets.filter((s) => s.id !== setId) } : d
      )
    );
  }, []);

  const moveSetToDay = useCallback((fromDay: number, toDay: number, setId: string) => {
    setWeeklyPlan((prev) => {
      const set = prev[fromDay].sets.find((s) => s.id === setId);
      if (!set) return prev;
      return prev.map((d, i) => {
        if (i === fromDay) return { ...d, sets: d.sets.filter((s) => s.id !== setId) };
        if (i === toDay) return { ...d, sets: [...d.sets, set] };
        return d;
      });
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        subscription,
        addOns,
        events,
        weeklyPlan,
        assignedTrainer,
        toast,
        showToast,
        freezeSubscription,
        unfreezeSubscription,
        upgradeTier,
        toggleAddOn,
        assignTrainer,
        toggleEventRegistration,
        addSetToDay,
        removeSetFromDay,
        moveSetToDay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { WORKOUT_TEMPLATES };
