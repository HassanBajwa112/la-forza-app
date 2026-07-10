import { Flame, MapPin, Users, ChevronRight, Snowflake, Trophy, Tv, Dumbbell, PartyPopper, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GYM_INFO, TIERS, USER } from '../data/mockData';
import type { Tab } from '../components/BottomNav';
import type { GymEvent } from '../data/mockData';
import { ScreenLayout } from '../components/ScreenLayout';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysRemaining(end: string) {
  return Math.max(0, Math.ceil((new Date(end).getTime() - Date.now()) / 86400000));
}

export function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { subscription, events, addOns } = useApp();
  const tier = TIERS[subscription.tier];
  const upcoming = events.filter((e) => !e.registered).slice(0, 2);
  const registered = events.filter((e) => e.registered);
  const activeAddons = addOns.filter((a) => a.active);
  const crowdColor =
    GYM_INFO.crowdLevel < 40
      ? 'text-forza-red/70'
      : GYM_INFO.crowdLevel < 70
        ? 'text-forza-red'
        : 'text-forza-red-light';

  return (
    <ScreenLayout>
      <div className="px-5 pb-6">
      {/* Header */}
      <header className="flex items-center justify-between py-4 animate-slide-up">
        <div>
          <p className="text-forza-subtle text-xs">Good morning</p>
          <h1 className="font-display text-2xl font-bold text-white tracking-wide">
            {USER.name.split(' ')[0].toUpperCase()}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-forza-red/30 to-forza-red/5 border border-forza-red/35 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
        >
          <span className="text-forza-red-light text-sm font-bold">{USER.avatar}</span>
        </button>
      </header>

      {/* Membership card */}
      <section className="relative rounded-2xl overflow-hidden mb-5 card-glow animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-forza-red/15 via-forza-card to-forza-dark" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-forza-red/5 rounded-full" />
        <div className="relative p-5 border border-forza-red/20 rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-display text-forza-red text-xs tracking-[0.2em] font-semibold">LA FORZA</p>
              <p className="text-white text-xl font-bold mt-1">{tier.name}</p>
              <p className="text-forza-muted text-xs">{USER.memberId}</p>
            </div>
            {subscription.isFrozen ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forza-red/10 text-forza-red-light text-[10px] font-medium border border-forza-red/25">
                <Snowflake size={11} /> Frozen
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-forza-red/15 text-forza-red text-[10px] font-semibold border border-forza-red/30">
                Active
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-black/25 rounded-xl p-3">
              <p className="text-forza-subtle text-[10px] uppercase tracking-wider">Start</p>
              <p className="text-white text-sm font-semibold mt-0.5">{formatDate(subscription.startDate)}</p>
            </div>
            <div className="bg-black/25 rounded-xl p-3">
              <p className="text-forza-subtle text-[10px] uppercase tracking-wider">End</p>
              <p className="text-white text-sm font-semibold mt-0.5">{formatDate(subscription.endDate)}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-forza-muted text-xs">
              <span className="text-forza-red font-bold text-base">{daysRemaining(subscription.endDate)}</span> days left
            </p>
            <button onClick={() => onNavigate('membership')} className="text-forza-red text-xs font-semibold flex items-center gap-0.5">
              Manage <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-2.5 mb-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {[
          { icon: Flame, label: 'Streak', value: `${USER.streak}d`, color: 'text-forza-red-light' },
          { icon: Trophy, label: 'Visits', value: String(USER.visitsThisMonth), color: 'text-forza-red' },
          { icon: Users, label: 'In Gym', value: String(GYM_INFO.membersNow), color: crowdColor },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-forza-card border border-forza-border rounded-2xl p-3.5 text-center">
            <Icon size={18} className={`${color} mx-auto`} />
            <p className="text-white text-lg font-bold mt-1.5">{value}</p>
            <p className="text-forza-subtle text-[10px] font-medium">{label}</p>
          </div>
        ))}
      </section>

      {/* Crowd meter */}
      <section className="bg-forza-card border border-forza-border rounded-2xl p-4 mb-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <div className="flex justify-between items-center mb-3">
          <p className="text-white text-sm font-semibold">Crowd Meter</p>
          <span className={`text-xs font-bold ${crowdColor}`}>{GYM_INFO.crowdLevel}%</span>
        </div>
        <div className="h-2.5 bg-forza-elevated rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${GYM_INFO.crowdLevel}%`,
              background:
                GYM_INFO.crowdLevel < 40
                  ? 'rgba(212, 16, 11, 0.55)'
                  : GYM_INFO.crowdLevel < 70
                    ? '#D4100B'
                    : '#E83228',
            }}
          />
        </div>
        <p className="text-forza-subtle text-[11px] mt-2.5">
          {GYM_INFO.crowdLevel < 40 ? 'Quiet — great time to train' : GYM_INFO.crowdLevel < 70 ? 'Moderate — peak hours soon' : 'Busy — try off-peak hours'}
        </p>
      </section>

      {/* Quick actions */}
      <section className="mb-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-white text-sm font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Freeze Plan', tab: 'membership' as Tab, icon: Snowflake, color: 'text-forza-red-light' },
            { label: 'Upgrade', tab: 'membership' as Tab, icon: Zap, color: 'text-forza-red' },
            { label: 'My Workouts', tab: 'workout' as Tab, icon: Dumbbell, color: 'text-forza-red' },
            { label: 'Gym Events', tab: 'events' as Tab, icon: Tv, color: 'text-forza-red-light' },
          ].map(({ label, tab, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => onNavigate(tab)}
              className="bg-forza-card border border-forza-border rounded-2xl p-4 text-left active:scale-[0.98] transition-transform hover:border-forza-red/25"
            >
              <Icon size={20} className={color} />
              <p className="text-white text-sm font-semibold mt-2">{label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      {activeAddons.length > 0 && (
        <section className="mb-5 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <h2 className="text-white text-sm font-semibold mb-2">Active Add-ons</h2>
          <div className="flex gap-2 flex-wrap">
            {activeAddons.map((a) => (
              <span key={a.id} className="px-3 py-1.5 rounded-full bg-forza-red/10 border border-forza-red/30 text-forza-red text-xs font-medium">
                {a.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Events */}
      <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-semibold">What's On</h2>
          <button onClick={() => onNavigate('events')} className="text-forza-red text-xs font-semibold flex items-center">
            All <ChevronRight size={14} />
          </button>
        </div>
        {(registered.length > 0 ? registered : upcoming).slice(0, 2).map((ev) => (
          <div key={ev.id} className="bg-forza-card border border-forza-border rounded-2xl p-4 mb-2.5 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-forza-elevated flex items-center justify-center shrink-0">
              <EventIcon event={ev} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{ev.title}</p>
              <p className="text-forza-subtle text-[11px] mt-0.5">{formatDate(ev.date)} · {ev.time}</p>
            </div>
            {ev.registered && <span className="text-forza-red text-[10px] font-semibold shrink-0">Going</span>}
          </div>
        ))}
      </section>

      <footer className="flex items-center gap-2 text-forza-subtle mt-5 pb-2">
        <MapPin size={12} />
        <p className="text-[10px]">{GYM_INFO.location}</p>
      </footer>
      </div>
    </ScreenLayout>
  );
}

function EventIcon({ event }: { event: GymEvent }) {
  const props = { size: 20, className: 'text-forza-red' };
  if (event.category === 'screening') return <Tv {...props} />;
  if (event.category === 'class') return <Dumbbell {...props} />;
  if (event.category === 'challenge') return <Trophy {...props} />;
  return <PartyPopper {...props} />;
}
