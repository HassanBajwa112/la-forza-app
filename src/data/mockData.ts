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
  logoUrl: '/la-forza-logo.png',
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
  { id: 's1', name: 'Leg Day', muscleGroup: 'Legs', exercises: ['Squats', 'Leg Press', 'RDL', 'Leg Curl', 'Calf Raises'], color: '#E01E1E' },
  { id: 's2', name: 'Back Day', muscleGroup: 'Back', exercises: ['Deadlift', 'Pull-ups', 'Barbell Rows', 'Lat Pulldown', 'Face Pulls'], color: '#E01E1E' },
  { id: 's3', name: 'Chest & Triceps', muscleGroup: 'Push', exercises: ['Bench Press', 'Incline DB Press', 'Cable Flyes', 'Tricep Dips', 'Skull Crushers'], color: '#E01E1E' },
  { id: 's4', name: 'Shoulders', muscleGroup: 'Shoulders', exercises: ['OHP', 'Lateral Raises', 'Face Pulls', 'Shrugs', 'Arnold Press'], color: '#E01E1E' },
  { id: 's5', name: 'Arms', muscleGroup: 'Arms', exercises: ['Barbell Curl', 'Hammer Curls', 'Tricep Pushdown', 'Preacher Curl', 'Overhead Extension'], color: '#E01E1E' },
  { id: 's6', name: 'Core & Cardio', muscleGroup: 'Core', exercises: ['Planks', 'Cable Crunches', 'Russian Twists', 'Treadmill HIIT', 'Battle Ropes'], color: '#E01E1E' },
  { id: 's7', name: 'Full Body', muscleGroup: 'Full Body', exercises: ['Squats', 'Bench', 'Rows', 'OHP', 'Pull-ups'], color: '#E01E1E' },
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

export type ShopCategory = 'all' | 'supplements' | 'apparel' | 'accessories' | 'equipment';

export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  category: Exclude<ShopCategory, 'all'>;
  price: number;
  memberPrice: number;
  badge?: string;
  inStock: boolean;
  pickupOnly?: boolean;
}

export const SHOP_CATEGORIES: { id: ShopCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'equipment', label: 'Gear' },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'p1',
    name: 'Whey Protein 2kg',
    description: '24g protein per scoop. Chocolate flavor. Pick up at front desk after order.',
    category: 'supplements',
    price: 12500,
    memberPrice: 10999,
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Creatine Monohydrate',
    description: 'Micronized creatine for strength & power. 60 servings.',
    category: 'supplements',
    price: 3500,
    memberPrice: 2999,
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Pre-Workout Ignite',
    description: 'Caffeine + beta-alanine blend. Fruit punch. Train harder, recover faster.',
    category: 'supplements',
    price: 4200,
    memberPrice: 3699,
    badge: 'New',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'BCAA Recovery',
    description: 'Intra-workout amino blend. Reduces fatigue during heavy sessions.',
    category: 'supplements',
    price: 3800,
    memberPrice: 3299,
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Protein Bar 6-Pack',
    description: '20g protein per bar. Sold at the La Forza protein bar — order ahead.',
    category: 'supplements',
    price: 2400,
    memberPrice: 2099,
    inStock: true,
    pickupOnly: true,
  },
  {
    id: 'p6',
    name: 'La Forza Gym Tee',
    description: 'Black cotton tee with red logo. Unisex fit. S–XL available.',
    category: 'apparel',
    price: 2500,
    memberPrice: 2199,
    inStock: true,
  },
  {
    id: 'p7',
    name: 'La Forza Hoodie',
    description: 'Premium heavyweight hoodie. Embroidered logo. Limited drop.',
    category: 'apparel',
    price: 5500,
    memberPrice: 4799,
    badge: 'Limited',
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Training Shorts',
    description: 'Moisture-wicking with zip pocket. Built for leg day.',
    category: 'apparel',
    price: 3200,
    memberPrice: 2799,
    inStock: true,
  },
  {
    id: 'p9',
    name: 'Shaker Bottle',
    description: '700ml BPA-free shaker with La Forza branding. Leak-proof lid.',
    category: 'accessories',
    price: 1200,
    memberPrice: 999,
    inStock: true,
  },
  {
    id: 'p10',
    name: 'Lifting Straps',
    description: 'Padded cotton straps for deadlifts & rows. One size.',
    category: 'accessories',
    price: 1800,
    memberPrice: 1499,
    inStock: true,
  },
  {
    id: 'p11',
    name: 'Gym Towel',
    description: 'Quick-dry microfiber. Red trim. Essential for sauna access.',
    category: 'accessories',
    price: 900,
    memberPrice: 749,
    inStock: true,
  },
  {
    id: 'p12',
    name: 'Resistance Band Set',
    description: '5 bands with handles & door anchor. Home or travel workouts.',
    category: 'equipment',
    price: 2200,
    memberPrice: 1899,
    inStock: true,
  },
  {
    id: 'p13',
    name: 'Lifting Belt',
    description: '4" leather belt for squats & deadlifts. S–XL in stock.',
    category: 'equipment',
    price: 4500,
    memberPrice: 3999,
    inStock: false,
  },
  {
    id: 'p14',
    name: 'Fish Oil Omega-3',
    description: '90 softgels. Joint support & recovery for heavy lifters.',
    category: 'supplements',
    price: 2800,
    memberPrice: 2399,
    inStock: true,
  },
];

export function formatPrice(amount: number) {
  return `PKR ${amount.toLocaleString()}`;
}
