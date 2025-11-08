export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  age?: number;
  gender?: string;
  phoneNumber?: string;
}

export interface Session {
  id: string;
  userId: string;
  duration: number;
  date: string;
  completed: boolean;
}

export interface Stats {
  totalDays: number;
  missedDays: number;
  totalMinutes: number;
  avgDuration: number;
  weeklyData: { date: string; minutes: number }[];
  monthlyData: { date: string; minutes: number }[];
  threeMonthData: { date: string; minutes: number }[];
}
