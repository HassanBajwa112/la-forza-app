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

  return (
    <ScreenLayout>
      <div className="px-5 pb-6">
        <header className="py-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-caps">Good morning</p>
              <h1 className="font-display text-[1.85rem] font-bold text-forza-red uppercase tracking-wide leading-none mt-1">
                {USER.name.split(' ')[0]}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 rounded-full bg-forza-red shadow-premium-sm flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            >
              <span className="text-forza-white text-sm font-bold">{USER.avatar}</span>
            </button>
          </div>

          <div className="trust-strip mt-4">
            <span className="h-1 w-1 rounded-full bg-forza-red/50" />
            <span className="text-[10px] font-semibold text-forza-red/70 uppercase tracking-wide">
              Bahria Town · FOREMAN Equipment
            </span>
          </div>
        </header>

        {/* Membership hero */}
        <section className="hero-panel mb-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <div className="hero-panel-inner">
            <div className="flex justify-between items-start">
              <div>
                <p className="label-caps-light">La Forza Membership</p>
                <p className="font-display text-2xl font-bold text-forza-white uppercase tracking-wide mt-1">
                  {tier.name}
                </p>
                <p className="text-forza-white/65 text-xs mt-0.5">{USER.memberId}</p>
              </div>
              {subscription.isFrozen ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forza-white/15 text-forza-white text-[10px] font-semibold border border-forza-white/25">
                  <Snowflake size={11} /> Frozen
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-forza-white/20 text-forza-white text-[10px] font-bold uppercase tracking-wide border border-forza-white/30">
                  Active
                </span>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: 'Start', value: formatDate(subscription.startDate) },
                { label: 'End', value: formatDate(subscription.endDate) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-forza-white/10 border border-forza-white/15 p-3">
                  <p className="label-caps-light">{label}</p>
                  <p className="text-forza-white text-sm font-semibold mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-forza-white/75 text-xs">
                <span className="font-display text-2xl font-bold text-forza-white">
                  {daysRemaining(subscription.endDate)}
                </span>
                {' '}days left
              </p>
              <button
                onClick={() => onNavigate('membership')}
                className="flex items-center gap-0.5 text-forza-white text-xs font-bold uppercase tracking-wide"
              >
                Manage <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-2.5 mb-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {[
            { icon: Flame, label: 'Streak', value: `${USER.streak}d` },
            { icon: Trophy, label: 'Visits', value: String(USER.visitsThisMonth) },
            { icon: Users, label: 'In Gym', value: String(GYM_INFO.membersNow) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="surface-card p-3.5 text-center">
              <div className="icon-well mx-auto">
                <Icon size={17} className="text-forza-red" />
              </div>
              <p className="stat-value text-forza-red mt-2">{value}</p>
              <p className="label-caps mt-1">{label}</p>
            </div>
          ))}
        </section>

        {/* Crowd meter */}
        <section className="surface-card p-4 mb-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex justify-between items-center mb-3">
            <p className="section-title !mb-0">Crowd Meter</p>
            <span className="stat-value text-xl text-forza-red">{GYM_INFO.crowdLevel}%</span>
          </div>
          <div className="h-2 bg-forza-red/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-forza-red transition-all duration-700 shadow-premium-sm"
              style={{ width: `${GYM_INFO.crowdLevel}%` }}
            />
          </div>
          <p className="text-forza-red/55 text-[11px] mt-2.5">
            {GYM_INFO.crowdLevel < 40
              ? 'Quiet — great time to train'
              : GYM_INFO.crowdLevel < 70
                ? 'Moderate — peak hours soon'
                : 'Busy — try off-peak hours'}
          </p>
        </section>

        {/* Quick actions */}
        <section className="mb-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="section-title">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Freeze Plan', tab: 'membership' as Tab, icon: Snowflake },
              { label: 'Upgrade', tab: 'membership' as Tab, icon: Zap },
              { label: 'My Workouts', tab: 'workout' as Tab, icon: Dumbbell },
              { label: 'Gym Events', tab: 'events' as Tab, icon: Tv },
            ].map(({ label, tab, icon: Icon }) => (
              <button
                key={label}
                onClick={() => onNavigate(tab)}
                className="surface-card p-4 text-left active:scale-[0.98] transition-all hover:border-forza-red/20 hover:shadow-premium-sm"
              >
                <div className="icon-well">
                  <Icon size={18} className="text-forza-red" />
                </div>
                <p className="text-forza-red text-sm font-semibold mt-3">{label}</p>
              </button>
            ))}
          </div>
        </section>

        {activeAddons.length > 0 && (
          <section className="mb-5 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <p className="section-title">Active Add-ons</p>
            <div className="flex gap-2 flex-wrap">
              {activeAddons.map((a) => (
                <span
                  key={a.id}
                  className="px-3 py-1.5 rounded-full bg-forza-red/10 border border-forza-red/15 text-forza-red text-xs font-semibold uppercase tracking-wide"
                >
                  {a.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-3">
            <p className="section-title !mb-0">What&apos;s On</p>
            <button
              onClick={() => onNavigate('events')}
              className="text-forza-red text-xs font-bold uppercase tracking-wide flex items-center"
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          {(registered.length > 0 ? registered : upcoming).slice(0, 2).map((ev) => (
            <div key={ev.id} className="surface-card p-4 mb-2.5 flex items-center gap-3">
              <div className="icon-well shrink-0">
                <EventIcon event={ev} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-forza-red text-sm font-semibold truncate">{ev.title}</p>
                <p className="text-forza-red/50 text-[11px] mt-0.5">
                  {formatDate(ev.date)} · {ev.time}
                </p>
              </div>
              {ev.registered && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-forza-red shrink-0">
                  Going
                </span>
              )}
            </div>
          ))}
        </section>

        <footer className="flex items-center gap-2 text-forza-red/50 mt-6 pb-2">
          <MapPin size={12} />
          <p className="text-[10px] font-medium">{GYM_INFO.location}</p>
        </footer>
      </div>
    </ScreenLayout>
  );
}

function EventIcon({ event }: { event: GymEvent }) {
  const props = { size: 18, className: 'text-forza-red' };
  if (event.category === 'screening') return <Tv {...props} />;
  if (event.category === 'class') return <Dumbbell {...props} />;
  if (event.category === 'challenge') return <Trophy {...props} />;
  return <PartyPopper {...props} />;
}
