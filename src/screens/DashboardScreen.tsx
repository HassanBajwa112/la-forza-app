import { Calendar, FileText } from 'lucide-react';
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
import { StatusPill } from '../components/workzish/MemberShell';

export function DashboardScreen({
  onBookSpace,
  onViewBookings,
}: {
  onBookSpace: () => void;
  onViewBookings: () => void;
}) {
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
          </div>
        </div>

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
      </div>
    </ScreenLayout>
  );
}
