import { useState, type ReactNode } from 'react';
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

function AppContent() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<Tab>('home');

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  const screens: Record<Tab, ReactNode> = {
    home: <HomeScreen onNavigate={setTab} />,
    membership: <MembershipScreen />,
    events: <EventsScreen />,
    workout: <WorkoutScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="flex-1 flex flex-col h-full animate-fade-in">
      <Toast />
      <div className="flex-1 overflow-hidden relative">
        {screens[tab]}
      </div>
      <BottomNav active={tab} onChange={setTab} />
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
