import { User, Stats } from '../types';

const API_BASE_URL = 'https://meditation-tracker1.gurinder.dev';

// Helper to get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

// Helper to set token in localStorage
const setToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

// Helper to remove token from localStorage
const removeToken = (): void => {
  localStorage.removeItem('jwt_token');
};

// Helper to create headers with auth token
const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiService = {
  login: async (identifier: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store JWT token
    setToken(data.token);

    // Fetch user details after login
    const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user details');
    }

    const userData = await userResponse.json();
    
    return {
      id: userData.username,
      email: userData.email,
      username: userData.username,
      name: userData.name || '',
      age: userData.age,
      gender: userData.gender,
      phoneNumber: userData.email,
    };
  },

  signup: async (email: string, username: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    // After signup, login automatically
    return await apiService.login(username, password);
  },

  getStats: async (): Promise<Stats> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Get current year and month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // Fetch stats
    const statsResponse = await fetch(`${API_BASE_URL}/sessions/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!statsResponse.ok) {
      throw new Error('Failed to fetch stats');
    }

    const statsData = await statsResponse.json();

    // Fetch calendar data for current month
    const calendarResponse = await fetch(`${API_BASE_URL}/sessions/${year}/${month}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!calendarResponse.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    const calendarData = await calendarResponse.json();

    // Convert calendar data to the format expected by frontend
    const meditatedDatesSet = new Set(calendarData.meditatedDates);
    
    // Generate weekly data (last 7 days)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weeklyData.push({
        date: dateStr,
        minutes: meditatedDatesSet.has(dateStr) ? Math.floor(statsData.avgDuration) : 0,
      });
    }

    // Generate monthly data (last 30 days)
    const monthlyData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      monthlyData.push({
        date: dateStr,
        minutes: meditatedDatesSet.has(dateStr) ? Math.floor(statsData.avgDuration) : 0,
      });
    }

    // Generate three month data (last 90 days)
    const threeMonthData = [];
    for (let i = 89; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      threeMonthData.push({
        date: dateStr,
        minutes: meditatedDatesSet.has(dateStr) ? Math.floor(statsData.avgDuration) : 0,
      });
    }

    return {
      totalDays: statsData.totalDays,
      missedDays: statsData.missedDays,
      totalMinutes: statsData.totalMinutes,
      avgDuration: Math.round(statsData.avgDuration),
      weeklyData,
      monthlyData,
      threeMonthData,
    };
  },

  getCalendarData: async (year: number, month: number): Promise<{ meditatedDates: string[]; missedDates: string[] }> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/sessions/${year}/${month}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    return await response.json();
  },

  updateProfile: async (user: Partial<User>): Promise<User> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: user.name,
        age: user.age,
        gender: user.gender,
        email: user.phoneNumber || user.email,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    // Fetch updated user details
    const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch updated user details');
    }

    const userData = await userResponse.json();
    
    return {
      id: userData.username,
      email: userData.email,
      username: userData.username,
      name: userData.name || '',
      age: userData.age,
      gender: userData.gender,
      phoneNumber: userData.email,
    };
  },

  resetPassword: async (oldPassword: string, newPassword: string): Promise<boolean> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/users/resetpassword`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }

    return true;
  },

  saveSession: async (duration: number): Promise<void> => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ duration }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save session');
    }
  },

  logout: (): void => {
    removeToken();
  },
};
