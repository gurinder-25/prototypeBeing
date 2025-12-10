import { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { Home } from './components/Home';
import { Stats } from './components/Stats';
import { Profile } from './components/Profile';
import { DailyCheckIn } from './components/DailyCheckIn';
import { Layout } from './components/Layout';
import Guides from './components/Guides';
import Insights from './components/Insights';
import { AuthProvider, useAuth } from './context/AuthContext';
import { apiService } from './services/apiService';

// Configuration: Set to true for production (use localStorage), false for testing (always show check-in)
const USE_DAILY_CHECKIN_STORAGE = false;

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'profile'>('home');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [activeView, setActiveView] = useState<'main' | 'guides' | 'insights'>('main');

  // Check if user has already checked in today
  useEffect(() => {
    if (user) {
      if (USE_DAILY_CHECKIN_STORAGE) {
        // Production mode: Check localStorage
        const lastCheckIn = localStorage.getItem(`lastCheckIn_${user.username}`);
        const today = new Date().toDateString();
        
        if (lastCheckIn !== today) {
          setShowDailyCheckIn(true);
          setHasCheckedInToday(false);
        } else {
          setHasCheckedInToday(true);
        }
      } else {
        // Testing mode: Always show check-in
        setShowDailyCheckIn(true);
        setHasCheckedInToday(false);
      }
    }
  }, [user]);

  const handleCheckInComplete = async (meditated: boolean, duration?: number) => {
    if (meditated && duration) {
      try {
        await apiService.saveSession(duration);
        
        if (USE_DAILY_CHECKIN_STORAGE) {
          const today = new Date().toDateString();
          localStorage.setItem(`lastCheckIn_${user?.username}`, today);
        }
        
        setHasCheckedInToday(true);
        setShowDailyCheckIn(false);
      } catch (error) {
        console.error('Failed to save session:', error);
        // Still proceed to main app even if save fails
        setHasCheckedInToday(true);
        setShowDailyCheckIn(false);
      }
    }
  };

  const handleCheckInSkip = () => {
    if (USE_DAILY_CHECKIN_STORAGE) {
      const today = new Date().toDateString();
      localStorage.setItem(`lastCheckIn_${user?.username}`, today);
    }
    
    setHasCheckedInToday(true);
    setShowDailyCheckIn(false);
  };

  if (!user) {
    return <Auth />;
  }

  if (showDailyCheckIn && !hasCheckedInToday) {
    return (
      <DailyCheckIn
        onComplete={handleCheckInComplete}
        onSkip={handleCheckInSkip}
      />
    );
  }

  // Handle full-screen views (Guides & Insights)
  if (activeView === 'guides') {
    return <Guides onClose={() => setActiveView('main')} />;
  }

  if (activeView === 'insights') {
    return <Insights onClose={() => setActiveView('main')} />;
  }

  // Main app with bottom navigation
  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && (
        <Home
          onOpenGuides={() => setActiveView('guides')}
          onOpenInsights={() => setActiveView('insights')}
        />
      )}
      {activeTab === 'stats' && <Stats />}
      {activeTab === 'profile' && <Profile />}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
