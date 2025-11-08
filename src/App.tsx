import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Auth } from './components/Auth';
import { Layout } from './components/Layout';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { Profile } from './components/Profile';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'profile'>('home');

  if (!user) {
    return <Auth />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && <Timer />}
      {activeTab === 'stats' && <Stats />}
      {activeTab === 'profile' && <Profile />}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
