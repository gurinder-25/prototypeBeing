import { Home, BarChart3, User } from 'lucide-react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'home' | 'stats' | 'profile';
  onTabChange: (tab: 'home' | 'stats' | 'profile') => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-md mx-auto">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 max-w-md mx-auto">
        <div className="flex justify-around items-center h-20 px-8">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home' ? 'text-white' : 'text-zinc-600'
            }`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => onTabChange('stats')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'stats' ? 'text-white' : 'text-zinc-600'
            }`}
          >
            <BarChart3 size={24} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
            <span className="text-xs font-medium">Stats</span>
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' ? 'text-white' : 'text-zinc-600'
            }`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
