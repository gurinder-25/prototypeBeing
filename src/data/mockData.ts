import { User, Session, Stats } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'user@being.com',
  username: 'meditator',
  name: 'John Doe',
  age: 28,
  gender: 'Male',
  phoneNumber: '+1234567890',
};

export const mockSessions: Session[] = [
  { id: '1', userId: '1', duration: 600, date: '2025-11-01', completed: true },
  { id: '2', userId: '1', duration: 900, date: '2025-11-02', completed: true },
  { id: '3', userId: '1', duration: 1200, date: '2025-11-04', completed: true },
  { id: '4', userId: '1', duration: 600, date: '2025-11-05', completed: true },
  { id: '5', userId: '1', duration: 1500, date: '2025-11-07', completed: true },
];

const generateWeeklyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const minutes = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 10 : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      minutes,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const minutes = Math.random() > 0.2 ? Math.floor(Math.random() * 40) + 5 : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      minutes,
    });
  }
  return data;
};

const generateThreeMonthData = () => {
  const data = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const minutes = Math.random() > 0.25 ? Math.floor(Math.random() * 35) + 10 : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      minutes,
    });
  }
  return data;
};

export const mockStats: Stats = {
  totalDays: 45,
  missedDays: 12,
  totalMinutes: 1350,
  avgDuration: 30,
  weeklyData: generateWeeklyData(),
  monthlyData: generateMonthlyData(),
  threeMonthData: generateThreeMonthData(),
};
