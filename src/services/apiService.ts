import { User, Stats } from '../types';
import { mockUser, mockStats } from '../data/mockData';

export const apiService = {
  login: async (username: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (username === 'meditator' && password === 'password') {
      return mockUser;
    }
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, username: string, password: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ...mockUser, email, username };
  },

  getStats: async (): Promise<Stats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStats;
  },

  updateProfile: async (user: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockUser, ...user };
  },

  resetPassword: async (oldPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },

  saveSession: async (duration: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};
