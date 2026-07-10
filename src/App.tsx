import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { PhoneFrame } from './components/PhoneFrame';
import { MemberBottomNav, WorkzishTopBar, type MemberTab } from './components/workzish/MemberShell';
import type { OverlayScreen } from './components/workzish/MemberShell';
import { HomePickerModal } from './components/workzish/HomePickerModal';
import { Toast } from './components/Toast';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { MembershipScreen } from './screens/MembershipScreen';
import { EventsScreen } from './screens/EventsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { MyBookingsScreen } from './screens/MyBookingsScreen';
import { MyClassesScreen } from './screens/MyClassesScreen';
import { MyClassPacksScreen } from './screens/MyClassPacksScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BookNowScreen } from './screens/BookNowScreen';
import { ClassesScreen } from './screens/ClassesScreen';
import { ContactScreen } from './screens/ContactScreen';
import { ChangePasswordScreen } from './screens/ChangePasswordScreen';

function MemberApp({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<MemberTab>('dashboard');
  const [overlay, setOverlay] = useState<OverlayScreen>(null);
  const [homePickerOpen, setHomePickerOpen] = useState(false);

  if (overlay === 'book-now') return <BookNowScreen onBack={() => setOverlay(null)} />;
  if (overlay === 'class-reserve') return <ClassesScreen onBack={() => setOverlay(null)} />;
  if (overlay === 'contact') return <ContactScreen onBack={() => setOverlay(null)} />;
  if (overlay === 'change-password') return <ChangePasswordScreen onBack={() => setOverlay(null)} />;

  const screens: Record<MemberTab, React.ReactNode> = {
    dashboard: (
      <DashboardScreen
        onBookSpace={() => setOverlay('book-now')}
        onViewBookings={() => setTab('bookings')}
        onNavigate={setTab}
      />
    ),
    membership: <MembershipScreen />,
    events: <EventsScreen />,
    shop: <ShopScreen />,
    workout: <WorkoutScreen />,
    bookings: <MyBookingsScreen />,
    classes: <MyClassesScreen onReserve={() => setOverlay('class-reserve')} />,
    packs: <MyClassPacksScreen />,
    profile: (
      <ProfileScreen
        onChangePassword={() => setOverlay('change-password')}
        onLogout={onLogout}
      />
    ),
  };

  return (
    <div className="relative h-full min-h-0 flex flex-col bg-gray-50">
      <Toast />
      <WorkzishTopBar
        onOpenHomePicker={() => setHomePickerOpen(true)}
        onOpenProfile={() => setTab('profile')}
      />
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {screens[tab]}
      </div>
      <MemberBottomNav active={tab} onChange={setTab} />
      <HomePickerModal
        open={homePickerOpen}
        onClose={() => setHomePickerOpen(false)}
        onNavigate={setOverlay}
        onTabNavigate={setTab}
      />
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppProvider>
      <PhoneFrame>
        {loggedIn ? (
          <MemberApp onLogout={() => setLoggedIn(false)} />
        ) : (
          <LoginScreen onLogin={() => setLoggedIn(true)} />
        )}
      </PhoneFrame>
    </AppProvider>
  );
}
