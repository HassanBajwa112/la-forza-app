import { useState, useRef, type ReactNode } from 'react';
import { AppProvider } from './context/AppContext';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav, type Tab } from './components/BottomNav';
import { Toast } from './components/Toast';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MembershipScreen } from './screens/MembershipScreen';
import { EventsScreen } from './screens/EventsScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ShopScreen } from './screens/ShopScreen';
import { TabTransition } from './components/motion/Transitions';
import { tabDirection, springSnappy } from './motion/presets';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function MainApp({ tab, onTabChange }: { tab: Tab; onTabChange: (t: Tab) => void }) {
  const prevTab = useRef(tab);
  const direction = tabDirection(prevTab.current, tab);

  const handleTabChange = (next: Tab) => {
    prevTab.current = tab;
    onTabChange(next);
  };

  const screens: Record<Tab, ReactNode> = {
    home: <HomeScreen onNavigate={handleTabChange} />,
    membership: <MembershipScreen />,
    events: <EventsScreen />,
    shop: <ShopScreen />,
    workout: <WorkoutScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <>
      <Toast />
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <TabTransition tabKey={tab} direction={direction}>
          {screens[tab]}
        </TabTransition>
      </div>
      <BottomNav active={tab} onChange={handleTabChange} />
    </>
  );
}

function AppContent() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const reduced = useReducedMotion();

  const handleEnter = (initialTab?: Tab) => {
    if (initialTab) setTab(initialTab);
    setEntered(true);
  };

  return (
    <div className="flex flex-col h-full min-h-0 flex-1">
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="splash"
            className="flex flex-col h-full min-h-0 flex-1"
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={springSnappy}
          >
            <SplashScreen onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="flex flex-col h-full min-h-0 flex-1"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <MainApp tab={tab} onTabChange={setTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <AppContent />
      </PhoneFrame>
    </AppProvider>
  );
}
