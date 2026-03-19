export const USER = {
  name: 'Tom M.',
  initials: 'TM',
  plan: 'Longevity Pro',
  daysActive: 147,
  workoutsLogged: 89,
  dataPointsSynced: 12847,
};

export const SCORES = {
  sleep: 87,
  readiness: 84,
  activity: 71,
  strain: 12.4,
};

export const BIOMETRICS = {
  hrv: { current: 68, unit: 'ms', data7d: [62, 58, 65, 71, 68, 72, 68] },
  restingHR: { current: 52, unit: 'bpm', data7d: [54, 53, 55, 52, 51, 53, 52] },
  spo2: { current: 98, unit: '%', min: 95, max: 99 },
  bodyTemp: { current: 0.2, unit: '°F', baseline: 97.8 },
  weight: { current: 178.4, unit: 'lbs', data7d: [179.1, 178.8, 178.6, 178.9, 178.5, 178.3, 178.4] },
  bodyFat: { current: 14.2, unit: '%' },
  bloodPressure: { connected: false },
};

export const SLEEP = {
  total: '7h 22m',
  totalMinutes: 442,
  deep: { label: 'Deep', duration: '1h 44m', minutes: 104, color: '#5B5FC7' },
  rem: { label: 'REM', duration: '1h 58m', minutes: 118, color: '#7C6EFA' },
  light: { label: 'Light', duration: '3h 12m', minutes: 192, color: '#A5A0F5' },
  awake: { label: 'Awake', duration: '28m', minutes: 28, color: '#444455' },
  efficiency: 94,
  latency: '12 min',
  timeInBed: '7h 50m',
};

export const ACTIVITY = {
  steps: 8432,
  activeCalories: 487,
  standHours: { current: 9, goal: 12 },
  currentWorkout: { name: 'Upper Body Strength', setsComplete: 3, setsTotal: 4 },
  weeklyData: [320, 510, 445, 487, 290, 380, 420],
  streak: 12,
};

export const SUPPLEMENTS = [
  { name: 'Omega-3', done: true },
  { name: 'Vitamin D', done: true },
  { name: 'Magnesium', done: false },
  { name: 'Creatine', done: false },
  { name: 'NAD+', done: false },
];

export const UPCOMING = [
  { time: '9:00 AM', label: 'Supplement reminder', emoji: '💊' },
  { time: '2:30 PM', label: 'Check-in call with client', emoji: '📞' },
  { time: '6:00 PM', label: 'Evening workout', emoji: '🏋️' },
];

export const SLEEP_SCORE_7D = [82, 79, 85, 88, 84, 90, 87];
export const HRV_30D = [55, 58, 52, 60, 63, 58, 62, 65, 59, 63, 67, 64, 68, 65, 70, 68, 72, 69, 65, 68, 71, 74, 70, 68, 72, 69, 65, 68, 71, 68];
export const ACTIVITY_30D = [310, 420, 380, 510, 290, 445, 520, 380, 410, 490, 320, 510, 445, 487, 290, 380, 420, 510, 380, 410, 490, 320, 510, 445, 487, 290, 380, 420, 350, 487];
export const WEIGHT_30D = [181.2, 180.8, 180.5, 180.1, 179.8, 179.9, 179.5, 179.6, 179.2, 179.4, 179.1, 179.0, 178.8, 179.1, 178.6, 178.9, 178.5, 178.3, 178.4, 178.6, 178.3, 178.5, 178.2, 178.4, 178.1, 178.3, 178.4, 178.2, 178.5, 178.4];

export const LOG_ENTRIES = [
  { id: 1, type: 'water', label: '16 oz water', time: '7:30 AM', emoji: '💧' },
  { id: 2, type: 'supplement', label: 'Omega-3', time: '7:45 AM', emoji: '💊' },
  { id: 3, type: 'supplement', label: 'Vitamin D', time: '7:45 AM', emoji: '💊' },
  { id: 4, type: 'food', label: 'Protein smoothie', time: '8:15 AM', emoji: '🍎' },
  { id: 5, type: 'mood', label: 'Feeling great', time: '9:00 AM', emoji: '😄' },
  { id: 6, type: 'water', label: '8 oz water', time: '10:30 AM', emoji: '💧' },
];
