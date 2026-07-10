import { Flame, MapPin, Users, ChevronRight, Snowflake, Trophy, Tv, Dumbbell, PartyPopper, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GYM_INFO, TIERS, USER } from '../data/mockData';
import type { Tab } from '../components/BottomNav';
import type { GymEvent } from '../data/mockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { Stagger, StaggerItem, Pressable, AnimatedBar, AnimatedNumber } from '../components/motion';

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
  const daysLeft = daysRemaining(subscription.endDate);

  return (
    <ScreenLayout>
      <Stagger className="px-5 pb-6">
        <StaggerItem>
          <header className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="label-caps-muted">Good morning</p>
                <h1 className="font-display text-[1.85rem] font-bold text-forza-white uppercase tracking-wide leading-none mt-1">
                  {USER.name.split(' ')[0]}
                </h1>
              </div>
              <Pressable
                type="button"
                onClick={() => onNavigate('profile')}
                className="w-11 h-11 rounded-full bg-forza-red shadow-glow flex items-center justify-center shrink-0"
              >
                <span className="text-forza-white text-sm font-bold">{USER.avatar}</span>
              </Pressable>
            </div>

            <div className="trust-strip mt-4">
              <MapPin size={11} className="text-forza-red" />
              <span className="text-[10px] font-semibold text-forza-muted uppercase tracking-wide">
                {GYM_INFO.location}
              </span>
            </div>
          </header>
        </StaggerItem>

        <StaggerItem>
          <section className="hero-panel mb-5">
            <div className="hero-panel-inner">
              <div className="flex justify-between items-start">
                <div>
                  <p className="label-caps">La Forza Membership</p>
                  <p className="font-display text-2xl font-bold text-forza-white uppercase tracking-wide mt-1">
                    {tier.name}
                  </p>
                  <p className="text-forza-muted text-xs mt-0.5">{USER.memberId}</p>
                </div>
                {subscription.isFrozen ? (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forza-elevated text-forza-muted text-[10px] font-semibold border border-forza-border">
                    <Snowflake size={11} /> Frozen
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-forza-red/15 text-forza-red text-[10px] font-bold uppercase tracking-wide border border-forza-red/30">
                    Active
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: 'Start', value: formatDate(subscription.startDate) },
                  { label: 'End', value: formatDate(subscription.endDate) },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-forza-elevated/80 border border-forza-border p-3">
                    <p className="label-caps-muted">{label}</p>
                    <p className="text-forza-white text-sm font-semibold mt-1">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-forza-muted text-xs">
                  <AnimatedNumber value={daysLeft} className="font-display text-2xl font-bold text-forza-red" />
                  {' '}days left
                </p>
                <Pressable type="button" onClick={() => onNavigate('membership')} className="flex items-center gap-0.5 text-forza-red text-xs font-bold uppercase tracking-wide">
                  Manage <ChevronRight size={14} />
                </Pressable>
              </div>
            </div>
          </section>
        </StaggerItem>

        <StaggerItem>
          <section className="grid grid-cols-3 gap-2.5 mb-5">
            {[
              { icon: Flame, label: 'Streak', value: `${USER.streak}d` },
              { icon: Trophy, label: 'Visits', value: String(USER.visitsThisMonth) },
              { icon: Users, label: 'In Gym', value: String(GYM_INFO.membersNow) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-card p-3.5 text-center">
                <div className="icon-well mx-auto">
                  <Icon size={17} className="text-forza-red" />
                </div>
                <p className="stat-value mt-2">{value}</p>
                <p className="label-caps-muted mt-1">{label}</p>
              </div>
            ))}
          </section>
        </StaggerItem>

        <StaggerItem>
          <section className="surface-card p-4 mb-5">
            <div className="flex justify-between items-center mb-3">
              <p className="section-title !mb-0">Crowd Meter</p>
              <span className="stat-value text-xl text-forza-red">
                <AnimatedNumber value={GYM_INFO.crowdLevel} />%
              </span>
            </div>
            <div className="h-2 bg-forza-elevated rounded-full overflow-hidden">
              <AnimatedBar value={GYM_INFO.crowdLevel} />
            </div>
            <p className="text-forza-muted text-[11px] mt-2.5">
              {GYM_INFO.crowdLevel < 40
                ? 'Quiet — great time to train'
                : GYM_INFO.crowdLevel < 70
                  ? 'Moderate — peak hours soon'
                  : 'Busy — try off-peak hours'}
            </p>
          </section>
        </StaggerItem>

        <StaggerItem>
          <section className="mb-5">
            <p className="section-title">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Freeze Plan', tab: 'membership' as Tab, icon: Snowflake },
                { label: 'Upgrade', tab: 'membership' as Tab, icon: Zap },
                { label: 'My Workouts', tab: 'workout' as Tab, icon: Dumbbell },
                { label: 'Gym Events', tab: 'events' as Tab, icon: Tv },
              ].map(({ label, tab, icon: Icon }) => (
                <Pressable
                  key={label}
                  type="button"
                  onClick={() => onNavigate(tab)}
                  className="surface-card p-4 text-left hover:border-forza-red/30"
                >
                  <div className="icon-well">
                    <Icon size={18} className="text-forza-red" />
                  </div>
                  <p className="text-forza-white text-sm font-semibold mt-3">{label}</p>
                </Pressable>
              ))}
            </div>
          </section>
        </StaggerItem>

        {activeAddons.length > 0 && (
          <StaggerItem>
            <section className="mb-5">
              <p className="section-title">Active Add-ons</p>
              <div className="flex gap-2 flex-wrap">
                {activeAddons.map((a) => (
                  <span
                    key={a.id}
                    className="px-3 py-1.5 rounded-full bg-forza-red/10 border border-forza-red/25 text-forza-red text-xs font-semibold uppercase tracking-wide"
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            </section>
          </StaggerItem>
        )}

        <StaggerItem>
          <section>
            <div className="flex justify-between items-center mb-3">
              <p className="section-title !mb-0">What&apos;s On</p>
              <Pressable type="button" onClick={() => onNavigate('events')} className="text-forza-red text-xs font-bold uppercase tracking-wide flex items-center">
                All <ChevronRight size={14} />
              </Pressable>
            </div>
            {(registered.length > 0 ? registered : upcoming).slice(0, 2).map((ev) => (
              <div key={ev.id} className="surface-card p-4 mb-2.5 flex items-center gap-3">
                <div className="icon-well shrink-0">
                  <EventIcon event={ev} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-forza-white text-sm font-semibold truncate">{ev.title}</p>
                  <p className="text-forza-muted text-[11px] mt-0.5">
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
        </StaggerItem>

        <StaggerItem>
          <footer className="flex items-center gap-2 text-forza-muted mt-6 pb-2">
            <ClockIcon />
            <p className="text-[10px] font-medium">Co-ed {GYM_INFO.hours.coed.split(' · ')[0]}</p>
          </footer>
        </StaggerItem>
      </Stagger>
    </ScreenLayout>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-forza-red">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function EventIcon({ event }: { event: GymEvent }) {
  const props = { size: 18, className: 'text-forza-red' };
  if (event.category === 'screening') return <Tv {...props} />;
  if (event.category === 'class') return <Dumbbell {...props} />;
  if (event.category === 'challenge') return <Trophy {...props} />;
  return <PartyPopper {...props} />;
}
