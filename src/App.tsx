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

// Configuration: Set to true to enable 2-second auto-repeat for testing, false for production
const ENABLE_TESTING_AUTO_REPEAT = false;

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'profile'>('home');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);
  const [activeView, setActiveView] = useState<'main' | 'guides' | 'insights'>('main');

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.view) {
        setActiveView(event.state.view);
      } else {
        setActiveView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'main' }, '', window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Always show daily check-in when user logs in
  useEffect(() => {
    if (user) {
      setShowDailyCheckIn(true);
    }
  }, [user]);

  const handleCheckInComplete = async (meditated: boolean, duration?: number) => {
    if (meditated && duration) {
      try {
        await apiService.saveSession(duration);
        setShowDailyCheckIn(false);

        // In testing mode, allow showing check-in again after 2 seconds
        // This lets you test multiple sessions per day
        if (ENABLE_TESTING_AUTO_REPEAT) {
          console.log('⏱️ Testing mode: Check-in will be available again in 2 seconds...');
          setTimeout(() => {
            setShowDailyCheckIn(true);
            console.log('✅ Check-in ready again!');
          }, 2000);
        }
      } catch (error) {
        console.error('Failed to save session:', error);
        // Still proceed to main app even if save fails
        setShowDailyCheckIn(false);
      }
    }
  };

  const handleCheckInSkip = () => {
    setShowDailyCheckIn(false);
  };

  if (!user) {
    return <Auth />;
  }

  if (showDailyCheckIn) {
    return (
      <DailyCheckIn
        onComplete={handleCheckInComplete}
        onSkip={handleCheckInSkip}
      />
    );
  }

  // Handle full-screen views (Guides & Insights)
  if (activeView === 'guides') {
    return <Guides onClose={() => {
      window.history.back();
    }} />;
  }

  if (activeView === 'insights') {
    return <Insights onClose={() => {
      window.history.back();
    }} />;
  }

  // Main app with bottom navigation
  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && (
        <Home
          onOpenGuides={() => {
            window.history.pushState({ view: 'guides' }, '', window.location.href);
            setActiveView('guides');
          }}
          onOpenInsights={() => {
            window.history.pushState({ view: 'insights' }, '', window.location.href);
            setActiveView('insights');
          }}
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
