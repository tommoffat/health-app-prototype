export const user = { name: 'Tom', initials: 'TM' }
export const today = {
  date: 'Thursday, March 19',
  sleep: { score: 87, total: '7h 22m', deep: '1h 44m', rem: '1h 58m', light: '3h 12m', awake: '28m', efficiency: 94, latency: 12, restingHR: 52, hrv: 68 },
  readiness: { score: 84, hrv: 68, restingHR: 52, bodyTemp: '+0.2°F', spo2: 98 },
  activity: { score: 71, steps: 8432, calories: 487, activeMinutes: 34, standHours: 9 },
  strain: 12.4,
  weight: 178.4,
  workout: { name: 'Upper Body Strength', setsComplete: 3, setsTotal: 4 },
  supplements: [
    { name: 'Omega-3', done: true },
    { name: 'Vitamin D', done: true },
    { name: 'Magnesium', done: false },
    { name: 'Creatine', done: false },
    { name: 'NAD+', done: false },
  ],
  upcoming: [
    { time: '9:00 AM', label: 'Supplement reminder' },
    { time: '2:30 PM', label: 'Client check-in call' },
  ],
  insights: [
    'HRV trending up 12% this week',
    'Optimal bedtime tonight: 10:30 PM',
    'Zone 2 training load is on target',
  ],
}
export const weeklyHRV = [61, 64, 68, 65, 70, 68, 68]
export const weeklySleep = [79, 83, 91, 85, 88, 87, 87]
export const weeklyActivity = [65, 72, 80, 68, 74, 71, 71]
export const weeklyWeight = [179.2, 179.0, 178.8, 178.6, 178.4, 178.4, 178.4]
