import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has a valid token on mount
    const checkAuth = async () => {
      const token = sessionStorage.getItem('jwt_token');
      
      if (token) {
        try {
          // Try to fetch user details with the stored token
          const response = await fetch('http://localhost:8080/users/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.username,
              email: userData.email,
              username: userData.username,
              name: userData.name || '',
              age: userData.age,
              gender: userData.gender,
              phoneNumber: userData.email,
            });
          } else {
            // Token is invalid, clear it
            sessionStorage.removeItem('jwt_token');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          sessionStorage.removeItem('jwt_token');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('jwt_token');
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
