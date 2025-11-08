import { useState } from 'react';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      <div className="w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Being</h1>
          <p className="text-zinc-500 text-sm">Your journey to inner peace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                required
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-2xl px-6 py-4 font-semibold hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-zinc-500 text-sm hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>

        {isLogin && (
          <p className="text-xs text-center text-zinc-600 mt-4">
            Demo: username: <span className="text-zinc-400">meditator</span> / password: <span className="text-zinc-400">password</span>
          </p>
        )}
      </div>
    </div>
  );
};
