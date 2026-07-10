/** Mock data shaped like laforza.workzish.com member portal */

export const GYM = {
  name: 'La Forza',
  location: 'Sector F, Bahria Town, Lahore',
  landmark: 'Near Winterland',
  phone: '+92 300 1234567',
  email: 'info@laforzagyms.com',
  whatsapp: '+92 300 1234567',
  instagram: '@laforzagyms',
  logoUrl: '/la-forza-logo.png',
  brandColor: '#d83924',
};

export const MEMBER = {
  name: 'Yousaf Rizwan',
  email: 'yousaf@example.com',
  phone: '+92 300 9876543',
  memberNumber: 'LF-0847',
  memberSince: '2025-01-15',
  dob: '1998-03-12',
  gender: 'Male',
  address: 'Sector F, Bahria Town, Lahore',
  fatherName: 'Rizwan Ahmed',
  cnic: '35202-1234567-1',
  avatarInitial: 'Y',
};

export const MEMBERSHIP = {
  hasMembership: true,
  membershipName: 'Elite Membership',
  membershipTypeName: 'Gym + Sauna',
  status: 'Active',
  progressPercentage: 68,
  daysRemaining: 127,
  totalDays: 365,
  totalFee: 12500,
  startDate: '2025-07-10',
  endDate: '2026-07-10',
  membershipDues: 0,
  posDues: 0,
  bookingDues: 1500,
};

export const ATTENDANCE = {
  attendancePercentage: 78,
  daysAttended: 18,
  daysMissed: 5,
  thisMonthAttendance: 12,
  lastMonthAttendance: 15,
  lastAttendanceDate: '2026-07-09',
};

export const MEASUREMENT = {
  hasMeasurement: true,
  measurementDate: '2026-07-05',
  weight: 78.5,
  weightChange: -1.2,
  height: 178,
  bmi: 24.8,
  bmiChange: -0.4,
  bodyFatPercentage: 16.2,
  bodyFatChange: -0.8,
};

export const WALLET = {
  enabled: true,
  balance: 3500,
};

export type BookingStatus = 'pending' | 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  space: string;
  date: string;
  time: string;
  slots: number;
  status: BookingStatus;
  paid: number;
  remaining: number;
}

export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    space: 'Boxing Ring',
    date: '2026-07-12',
    time: '6:00 PM – 7:00 PM',
    slots: 2,
    status: 'upcoming',
    paid: 2000,
    remaining: 0,
  },
  {
    id: 'b2',
    space: 'Sauna Room',
    date: '2026-07-08',
    time: '8:00 PM – 8:30 PM',
    slots: 1,
    status: 'completed',
    paid: 1500,
    remaining: 0,
  },
  {
    id: 'b3',
    space: 'PT Studio',
    date: '2026-07-14',
    time: '5:00 PM – 6:00 PM',
    slots: 2,
    status: 'pending',
    paid: 0,
    remaining: 2500,
  },
];

export type ClassStatus = 'confirmed' | 'pending' | 'cancelled' | 'rejected';

export interface MemberClass {
  id: string;
  title: string;
  date: string;
  time: string;
  status: ClassStatus;
  dueAmount?: number;
  paidWithPack?: boolean;
}

export const MEMBER_CLASSES: MemberClass[] = [
  {
    id: 'c1',
    title: 'Boxing Conditioning',
    date: '2026-07-11',
    time: '7:00 PM',
    status: 'confirmed',
    paidWithPack: true,
  },
  {
    id: 'c2',
    title: 'HIIT Blast',
    date: '2026-07-15',
    time: '6:30 AM',
    status: 'pending',
    dueAmount: 1500,
  },
];

export type PackStatus = 'active' | 'expired' | 'cancelled';

export interface ClassPack {
  id: string;
  name: string;
  credits: number | 'unlimited';
  creditsUsed: number;
  status: PackStatus;
  dueAmount?: number;
  expiryDate: string;
  trial?: boolean;
}

export const CLASS_PACKS: ClassPack[] = [
  {
    id: 'cp1',
    name: 'Boxing Classes — 12 Pack',
    credits: 12,
    creditsUsed: 4,
    status: 'active',
    expiryDate: '2026-09-10',
  },
  {
    id: 'cp2',
    name: 'Trial Class Pack',
    credits: 3,
    creditsUsed: 3,
    status: 'expired',
    expiryDate: '2025-02-15',
    trial: true,
  },
];

export const BOOKING_SPACES = [
  'Boxing Ring',
  'Sauna Room',
  'PT Studio',
  'Cardio Deck',
  'Women-Only Zone',
];

export function formatCurrency(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}
