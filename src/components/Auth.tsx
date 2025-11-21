import { useState } from 'react';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = await apiService.login(username, password);
        login(user);
      } else {
        const user = await apiService.signup(email, username, password);
        login(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.08);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .fade-in-scale {
          animation: fade-in-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* Ambient Background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="w-full relative z-10 space-y-12 fade-in-scale">
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-5xl font-semibold tracking-[0.25em] text-white mb-6">BEING</h1>
            <p className="text-zinc-500 text-lg tracking-wide font-light">Your journey to inner peace</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:bg-white/[0.06] transition-all duration-300"
                required
              />
            </div>
          )}

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder={isLogin ? "Username or Email" : "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:bg-white/[0.06] transition-all duration-300"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full glass-morphism rounded-[2rem] pl-14 pr-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:bg-white/[0.06] transition-all duration-300"
              required
            />
          </div>

          {error && (
            <div className="glass-morphism rounded-2xl px-5 py-4 border border-red-500/20 bg-red-500/5">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black rounded-[2rem] px-6 py-5 font-semibold tracking-wide hover:bg-zinc-100 transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-center gap-2">
              <span>{loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}</span>
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
            </div>
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-zinc-600 text-sm hover:text-white transition-colors duration-300 tracking-wide"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>

      {/* Bottom Ambient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
