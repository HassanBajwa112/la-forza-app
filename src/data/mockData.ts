export type Tier = 'essentials' | 'elite';

export interface Subscription {
  tier: Tier;
  startDate: string;
  endDate: string;
  isFrozen: boolean;
  frozenUntil?: string;
  monthlyPrice: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  active: boolean;
  icon: string;
}

export interface GymEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: 'screening' | 'class' | 'social' | 'challenge';
  image: string;
  spots?: number;
  registered?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  sessions: number;
  price: number;
  avatar: string;
  available: string[];
}

export interface WorkoutSet {
  id: string;
  name: string;
  muscleGroup: string;
  exercises: string[];
  color: string;
}

export interface DayPlan {
  day: string;
  shortDay: string;
  sets: WorkoutSet[];
}

export const GYM_INFO = {
  name: 'La Forza',
  tagline: 'Strength. Discipline. Power.',
  instagram: '@laforzagyms',
  instagramUrl: 'https://www.instagram.com/laforzagyms/',
  logoUrl:
    'https://scontent.cdninstagram.com/v/t51.82787-19/659004585_18080254304120419_4972858865785673701_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=FxAf0ycx8tYQ7kNvwGEJuqm&_nc_oc=AdrAskdq-ps3Wng7-HY5xPFLt8jwqVPlwKTt00UN4EkXRzuTx4E_63N7le7Kvhp_ycp0t0fDhuelNN9WiET1Y4Rv&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7f60f&oh=00_AQBy8m2F1fgGR5b8pgEfu-jPkxec8ND2UOFA44LxeWrKtw&oe=6A560D1E',
  logoFallback: '/la-forza-logo.svg',
  location: 'Sector F, Bahria Town, Lahore',
  landmark: 'Near Winterland',
  phone: '+92 300 1234567',
  hours: {
    coed: '6:00 AM – 10:00 AM · 3:00 PM – 12:00 AM',
    womenOnly: '10:00 AM – 3:00 PM',
  },
  amenities: [
    'Premium FOREMAN Equipment',
    'Capsule Treadmills',
    'Sauna & Steam Room',
    'Boxing Ring',
    'Free Weights Zone',
    'Cardio Deck',
    'Locker Rooms',
    'Protein Bar',
  ],
  crowdLevel: 62,
  membersNow: 47,
};

export const TIERS = {
  essentials: {
    id: 'essentials' as Tier,
    name: 'Essentials',
    subtitle: 'Gym Access',
    price: 8500,
    features: [
      'Full gym floor access',
      'Cardio & strength equipment',
      'Locker room access',
      'Women-only hours access',
      'Digital check-in',
    ],
    excluded: ['Sauna & steam room', 'Priority class booking'],
  },
  elite: {
    id: 'elite' as Tier,
    name: 'Elite',
    subtitle: 'Gym + Sauna',
    price: 12500,
    features: [
      'Everything in Essentials',
      'Sauna & steam room access',
      'Priority event registration',
      'Guest pass (1x/month)',
      'Exclusive member events',
    ],
    excluded: [],
  },
};

export const DEFAULT_ADDONS: AddOn[] = [
  {
    id: 'boxing',
    name: 'Boxing Classes',
    description: 'Beginner to advanced sessions with certified coaches. 3 classes/week.',
    price: 4500,
    period: '/month',
    active: false,
    icon: 'boxing',
  },
  {
    id: 'pt',
    name: 'Personal Trainer',
    description: '1-on-1 coaching with assigned trainer. 8 sessions/month.',
    price: 15000,
    period: '/month',
    active: true,
    icon: 'trainer',
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Ahmed Khan',
    specialty: 'Strength & Hypertrophy',
    rating: 4.9,
    sessions: 340,
    price: 15000,
    avatar: 'AK',
    available: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: 't2',
    name: 'Sara Malik',
    specialty: 'Boxing & Conditioning',
    rating: 4.8,
    sessions: 210,
    price: 14000,
    avatar: 'SM',
    available: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: 't3',
    name: 'Hassan Raza',
    specialty: 'Fat Loss & Nutrition',
    rating: 4.7,
    sessions: 180,
    price: 13000,
    avatar: 'HR',
    available: ['Mon', 'Tue', 'Thu'],
  },
];

export const EVENTS: GymEvent[] = [
  {
    id: 'e1',
    title: 'FIFA World Cup Screening',
    description: 'Watch the semi-finals on our 85" screen with fellow members. Snacks included.',
    date: '2026-07-15',
    time: '8:00 PM',
    category: 'screening',
    image: 'fifa',
    spots: 40,
    registered: true,
  },
  {
    id: 'e2',
    title: 'Boxing Showcase Night',
    description: 'Member sparring demonstrations and open ring sessions for add-on members.',
    date: '2026-07-18',
    time: '7:00 PM',
    category: 'class',
    image: 'boxing',
    spots: 20,
    registered: false,
  },
  {
    id: 'e3',
    title: 'Leg Day Challenge',
    description: 'Community squat challenge — most reps wins a free month upgrade.',
    date: '2026-07-20',
    time: '5:00 PM',
    category: 'challenge',
    image: 'challenge',
    spots: 50,
    registered: false,
  },
  {
    id: 'e4',
    title: 'Member Social & BBQ',
    description: 'Rooftop gathering for Elite members. Bring a friend.',
    date: '2026-07-25',
    time: '6:00 PM',
    category: 'social',
    image: 'social',
    spots: 30,
    registered: false,
  },
  {
    id: 'e5',
    title: 'UFC Fight Night Live',
    description: 'Live screening of UFC 310 main card. Energy drinks on the house.',
    date: '2026-08-02',
    time: '9:00 AM',
    category: 'screening',
    image: 'ufc',
    spots: 35,
    registered: false,
  },
];

export const WORKOUT_TEMPLATES: WorkoutSet[] = [
  { id: 's1', name: 'Leg Day', muscleGroup: 'Legs', exercises: ['Squats', 'Leg Press', 'RDL', 'Leg Curl', 'Calf Raises'], color: '#c41e3a' },
  { id: 's2', name: 'Back Day', muscleGroup: 'Back', exercises: ['Deadlift', 'Pull-ups', 'Barbell Rows', 'Lat Pulldown', 'Face Pulls'], color: '#2563eb' },
  { id: 's3', name: 'Chest & Triceps', muscleGroup: 'Push', exercises: ['Bench Press', 'Incline DB Press', 'Cable Flyes', 'Tricep Dips', 'Skull Crushers'], color: '#c9a227' },
  { id: 's4', name: 'Shoulders', muscleGroup: 'Shoulders', exercises: ['OHP', 'Lateral Raises', 'Face Pulls', 'Shrugs', 'Arnold Press'], color: '#7c3aed' },
  { id: 's5', name: 'Arms', muscleGroup: 'Arms', exercises: ['Barbell Curl', 'Hammer Curls', 'Tricep Pushdown', 'Preacher Curl', 'Overhead Extension'], color: '#059669' },
  { id: 's6', name: 'Core & Cardio', muscleGroup: 'Core', exercises: ['Planks', 'Cable Crunches', 'Russian Twists', 'Treadmill HIIT', 'Battle Ropes'], color: '#ea580c' },
  { id: 's7', name: 'Full Body', muscleGroup: 'Full Body', exercises: ['Squats', 'Bench', 'Rows', 'OHP', 'Pull-ups'], color: '#0891b2' },
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DEFAULT_WEEKLY_PLAN: DayPlan[] = [
  { day: 'Monday', shortDay: 'Mon', sets: [WORKOUT_TEMPLATES[0]] },
  { day: 'Tuesday', shortDay: 'Tue', sets: [WORKOUT_TEMPLATES[1]] },
  { day: 'Wednesday', shortDay: 'Wed', sets: [WORKOUT_TEMPLATES[2]] },
  { day: 'Thursday', shortDay: 'Thu', sets: [WORKOUT_TEMPLATES[3]] },
  { day: 'Friday', shortDay: 'Fri', sets: [WORKOUT_TEMPLATES[4]] },
  { day: 'Saturday', shortDay: 'Sat', sets: [WORKOUT_TEMPLATES[5]] },
  { day: 'Sunday', shortDay: 'Sun', sets: [] },
];

export const USER = {
  name: 'Yousaf Rizwan',
  memberSince: '2025-01-15',
  memberId: 'LF-2025-0847',
  avatar: 'YR',
  visitsThisMonth: 18,
  streak: 5,
};
