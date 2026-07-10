import {
  formatCurrency,
  formatDate,
  GYM,
  MEMBER,
  MEMBERSHIP,
  WALLET,
} from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill } from '../components/workzish/MemberShell';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 shrink-0">{label}</span>
      <span className="text-xs font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

export function ProfileScreen({
  onChangePassword,
  onLogout,
}: {
  onChangePassword: () => void;
  onLogout: () => void;
}) {
  return (
    <ScreenLayout>
      <div className="px-4 py-5 space-y-5">
        <div className="flex flex-col items-center pt-2 pb-2">
          <div className="h-16 w-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-2xl font-bold mb-3">
            {MEMBER.avatarInitial}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{MEMBER.name}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{MEMBER.memberNumber}</p>
        </div>

        <section className="wz-card !p-0 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Personal Info</p>
          </div>
          <div className="px-4 py-1">
            <Row label="Name" value={MEMBER.name} />
            <Row label="Phone" value={MEMBER.phone} />
            <Row label="Email" value={MEMBER.email} />
            <Row label="Date of Birth" value={formatDate(MEMBER.dob)} />
            <Row label="Gender" value={MEMBER.gender} />
            <Row label="Address" value={MEMBER.address} />
            <Row label="Father Name" value={MEMBER.fatherName} />
            <Row label="CNIC" value={MEMBER.cnic} />
            <Row label="Member Since" value={formatDate(MEMBER.memberSince)} />
          </div>
        </section>

        <section className="wz-card !p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">Active Membership</p>
            <StatusPill status={MEMBERSHIP.status} />
          </div>
          <p className="text-sm font-medium text-gray-900">{MEMBERSHIP.membershipName}</p>
          <p className="text-xs text-gray-500">{MEMBERSHIP.membershipTypeName}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <p className="wz-label">Start Date</p>
              <p className="wz-value">{formatDate(MEMBERSHIP.startDate)}</p>
            </div>
            <div>
              <p className="wz-label">End Date</p>
              <p className="wz-value">{formatDate(MEMBERSHIP.endDate)}</p>
            </div>
            <div>
              <p className="wz-label">Days Left</p>
              <p className="wz-value">{MEMBERSHIP.daysRemaining}</p>
            </div>
            <div>
              <p className="wz-label">Wallet Balance</p>
              <p className="wz-value text-brand-600">{formatCurrency(WALLET.balance)}</p>
            </div>
          </div>
        </section>

        <section className="wz-card !p-0 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Dues</p>
          </div>
          <div className="px-4 py-1">
            <Row label="Membership Dues" value={formatCurrency(MEMBERSHIP.membershipDues)} />
            <Row label="POS Dues" value={formatCurrency(MEMBERSHIP.posDues)} />
            <Row label="Booking Dues" value={formatCurrency(MEMBERSHIP.bookingDues)} />
          </div>
        </section>

        <section className="wz-card !p-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">{GYM.name}</p>
          <p className="text-xs text-gray-500">{GYM.location}</p>
          <p className="text-xs text-gray-500 mt-1">{GYM.phone}</p>
        </section>

        <div className="space-y-2 pb-4">
          <button type="button" onClick={onChangePassword} className="wz-btn-secondary w-full">
            Change Password
          </button>
          <button type="button" onClick={onLogout} className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-error-600 hover:bg-error-50">
            Logout
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
