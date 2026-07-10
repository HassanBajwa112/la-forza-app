import {
  Calendar,
  FileText,
  Flame,
  Users,
  Snowflake,
  Trophy,
  Tv,
  Dumbbell,
  PartyPopper,
  Zap,
  ShoppingBag,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GYM_INFO, TIERS, USER } from '../data/mockData';
import type { GymEvent } from '../data/mockData';
import {
  ATTENDANCE,
  formatCurrency,
  formatDate,
  MEASUREMENT,
  MEMBER,
  MEMBERSHIP,
  WALLET,
} from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill, type MemberTab } from '../components/workzish/MemberShell';
import { AnimatedBar, AnimatedNumber } from '../components/motion';

export function DashboardScreen({
  onBookSpace,
  onViewBookings,
  onNavigate,
}: {
  onBookSpace: () => void;
  onViewBookings: () => void;
  onNavigate: (tab: MemberTab) => void;
}) {
  const { subscription, events, addOns } = useApp();
  const tier = TIERS[subscription.tier];
  const upcoming = events.filter((e) => !e.registered).slice(0, 2);
  const registered = events.filter((e) => e.registered);
  const activeAddons = addOns.filter((a) => a.active);

  const changeClass = (val: number, invert = false) => {
    if (val === 0) return 'text-gray-400';
    const positive = val > 0;
    if (invert) return positive ? 'text-error-600' : 'text-success-600';
    return positive ? 'text-success-600' : 'text-error-600';
  };

  return (
    <ScreenLayout>
      <div className="px-4 py-5 space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 text-xl font-bold">
            {MEMBER.avatarInitial}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {MEMBER.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{tier.name} · {USER.memberId}</p>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Flame, label: 'Streak', value: `${USER.streak}d` },
            { icon: Trophy, label: 'Visits', value: String(USER.visitsThisMonth) },
            { icon: Users, label: 'In Gym', value: String(GYM_INFO.membersNow) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="wz-card text-center py-3.5">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
                <Icon size={17} className="text-brand-500" />
              </div>
              <p className="text-lg font-bold text-gray-900 mt-2">{value}</p>
              <p className="text-[10px] font-semibold text-gray-500 uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </section>

        <section className="wz-card !p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-semibold text-gray-900">Crowd Meter</p>
            <span className="text-xl font-bold text-brand-600">
              <AnimatedNumber value={GYM_INFO.crowdLevel} />%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <AnimatedBar value={GYM_INFO.crowdLevel} />
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {GYM_INFO.crowdLevel < 40
              ? 'Quiet — great time to train'
              : GYM_INFO.crowdLevel < 70
                ? 'Moderate — peak hours soon'
                : 'Busy — try off-peak hours'}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={onBookSpace} className="wz-card text-left hover:border-brand-300 hover:shadow-card-hover transition-all !p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mb-3">
              <Calendar className="text-brand-500" size={22} />
            </div>
            <p className="text-sm font-semibold text-gray-900">Book a Space</p>
            <p className="text-xs text-gray-500 mt-0.5">Book your space at La Forza</p>
          </button>
          <button type="button" onClick={onViewBookings} className="wz-card text-left hover:border-brand-300 hover:shadow-card-hover transition-all !p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 mb-3">
              <FileText className="text-success-500" size={22} />
            </div>
            <p className="text-sm font-semibold text-gray-900">View Bookings</p>
            <p className="text-xs text-gray-500 mt-0.5">View All</p>
          </button>
        </div>

        <section>
          <h2 className="wz-section-title">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: 'Freeze Plan', tab: 'membership' as MemberTab, icon: Snowflake },
              { label: 'Upgrade', tab: 'membership' as MemberTab, icon: Zap },
              { label: 'Member Shop', tab: 'shop' as MemberTab, icon: ShoppingBag },
              { label: 'My Workouts', tab: 'workout' as MemberTab, icon: Dumbbell },
              { label: 'Gym Events', tab: 'events' as MemberTab, icon: Tv },
            ].map(({ label, tab, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate(tab)}
                className="wz-card !p-4 text-left hover:border-brand-300 transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
                  <Icon size={18} className="text-brand-500" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-3">{label}</p>
              </button>
            ))}
          </div>
        </section>

        {activeAddons.length > 0 && (
          <section>
            <h2 className="wz-section-title">Active Add-ons</h2>
            <div className="flex gap-2 flex-wrap">
              {activeAddons.map((a) => (
                <span
                  key={a.id}
                  className="px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-semibold"
                >
                  {a.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="wz-section-title !mb-0">What&apos;s On</h2>
            <button
              type="button"
              onClick={() => onNavigate('events')}
              className="text-brand-600 text-xs font-semibold flex items-center"
            >
              All <ChevronRight size={14} />
            </button>
          </div>
          {(registered.length > 0 ? registered : upcoming).slice(0, 2).map((ev) => (
            <div key={ev.id} className="wz-card !p-4 mb-2.5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <EventIcon event={ev} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{ev.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {formatDate(ev.date)} · {ev.time}
                </p>
              </div>
              {ev.registered && (
                <span className="text-[10px] font-bold uppercase text-brand-600 shrink-0">Going</span>
              )}
            </div>
          ))}
        </section>

        {MEMBERSHIP.hasMembership && (
          <section className="wz-card !p-6">
            <h3 className="wz-section-title">Membership Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{MEMBERSHIP.membershipName}</span>
              <StatusPill status={MEMBERSHIP.status} />
            </div>
            <p className="text-xs text-gray-500 mb-3">{MEMBERSHIP.membershipTypeName}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{Math.round(MEMBERSHIP.progressPercentage)}%</span>
              <span>{MEMBERSHIP.daysRemaining} days remaining</span>
            </div>
            <div className="wz-progress-track mb-4">
              <div className="wz-progress-fill" style={{ width: `${MEMBERSHIP.progressPercentage}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Total Days', value: String(MEMBERSHIP.totalDays) },
                { label: 'Total Fee', value: formatCurrency(MEMBERSHIP.totalFee) },
                { label: 'Start Date', value: formatDate(MEMBERSHIP.startDate) },
                { label: 'End Date', value: formatDate(MEMBERSHIP.endDate) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="wz-label">{label}</p>
                  <p className="wz-value mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="wz-card !p-6">
          <h3 className="wz-section-title">Attendance Summary</h3>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-brand-500">{ATTENDANCE.attendancePercentage}%</p>
            <p className="text-xs text-gray-500">Attendance Rate</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-success-50 p-3 text-center">
              <p className="text-lg font-bold text-success-700">{ATTENDANCE.daysAttended}</p>
              <p className="text-xs text-gray-600">Days Attended</p>
            </div>
            <div className="rounded-xl bg-error-50 p-3 text-center">
              <p className="text-lg font-bold text-error-700">{ATTENDANCE.daysMissed}</p>
              <p className="text-xs text-gray-600">Days Missed</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="wz-label">This Month</p>
              <p className="wz-value">{ATTENDANCE.thisMonthAttendance}</p>
            </div>
            <div>
              <p className="wz-label">Last Month</p>
              <p className="wz-value">{ATTENDANCE.lastMonthAttendance}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Last Attendance: {formatDate(ATTENDANCE.lastAttendanceDate)}
          </p>
        </section>

        {MEASUREMENT.hasMeasurement && (
          <section className="wz-card !p-6">
            <h3 className="wz-section-title">Latest Measurement</h3>
            <p className="text-xs text-gray-500 mb-3">{formatDate(MEASUREMENT.measurementDate)}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="wz-label">Weight</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-lg font-bold text-gray-900">{MEASUREMENT.weight}</p>
                  <span className="text-xs text-gray-400">kg</span>
                  <span className={`text-xs ml-1 ${changeClass(MEASUREMENT.weightChange)}`}>
                    {MEASUREMENT.weightChange > 0 ? '+' : ''}{MEASUREMENT.weightChange}
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="wz-label">Height</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-lg font-bold text-gray-900">{MEASUREMENT.height}</p>
                  <span className="text-xs text-gray-400">cm</span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="wz-label">BMI</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-lg font-bold text-gray-900">{MEASUREMENT.bmi.toFixed(1)}</p>
                  <span className={`text-xs ${changeClass(MEASUREMENT.bmiChange, true)}`}>
                    {MEASUREMENT.bmiChange > 0 ? '+' : ''}{MEASUREMENT.bmiChange}
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="wz-label">Body Fat</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-lg font-bold text-gray-900">{MEASUREMENT.bodyFatPercentage.toFixed(1)}</p>
                  <span className="text-xs text-gray-400">%</span>
                  <span className={`text-xs ${changeClass(MEASUREMENT.bodyFatChange, true)}`}>
                    {MEASUREMENT.bodyFatChange > 0 ? '+' : ''}{MEASUREMENT.bodyFatChange}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {WALLET.enabled && (
          <section className="wz-card !p-6 border-brand-200 bg-brand-50">
            <h3 className="wz-section-title">Wallet Balance</h3>
            <p className="text-3xl font-bold text-brand-600">{formatCurrency(WALLET.balance)}</p>
            <p className="mt-1 text-xs text-gray-500">Available balance</p>
          </section>
        )}

        <footer className="flex items-center gap-2 text-gray-500 pb-2">
          <Clock size={12} className="text-brand-500" />
          <p className="text-[10px] font-medium">Co-ed {GYM_INFO.hours.coed.split(' · ')[0]}</p>
        </footer>
      </div>
    </ScreenLayout>
  );
}

function EventIcon({ event }: { event: GymEvent }) {
  const props = { size: 18, className: 'text-brand-500' };
  if (event.category === 'screening') return <Tv {...props} />;
  if (event.category === 'class') return <Dumbbell {...props} />;
  if (event.category === 'challenge') return <Trophy {...props} />;
  return <PartyPopper {...props} />;
}
