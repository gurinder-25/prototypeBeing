import { useState } from 'react';
import { LogOut, Lock, User as UserIcon, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';

export const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || '',
    email: user?.email || '',
  });

  const handleSave = async () => {
    if (user) {
      setLoading(true);
      setError('');
      try {
        const updatedUser = await apiService.updateProfile({
          ...user,
          name: formData.name,
          age: formData.age ? parseInt(formData.age) : undefined,
          gender: formData.gender,
          phoneNumber: formData.email,
        });
        updateUser(updatedUser);
        setIsEditing(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await apiService.resetPassword(oldPassword, newPassword);
      setShowPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };
///
  const handleLogout = () => {
    apiService.logout();
    logout();
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 pb-24">
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-zinc-500 text-sm">Manage your account</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center border-2 border-zinc-800">
            <UserIcon size={40} className="text-zinc-600" />
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">{user?.name || user?.username}</div>
            <div className="text-zinc-500 text-sm">{user?.username}</div>
          </div>
        </div>

        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800/50 overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={loading}
                className="text-sm text-white font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-zinc-500 text-sm mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-500 text-sm mb-2 block">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-sm mb-2 block">Gender</label>
                  <input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-500 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white disabled:opacity-50 focus:outline-none focus:border-zinc-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setShowPasswordModal(true);
              setError('');
            }}
            className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-zinc-900/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} />
              <span className="font-medium">Reset Password</span>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-red-500/20 transition-all text-red-400"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="font-medium">Log Out</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Sheet for Password Reset */}
      {showPasswordModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => {
              setShowPasswordModal(false);
              setError('');
            }}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
            <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Reset Password</h3>
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setError('');
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                )}

                <div className="space-y-4 mb-6">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setError('');
                    }}
                    className="flex-1 bg-zinc-800 rounded-2xl py-4 font-semibold hover:bg-zinc-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="flex-1 bg-white text-black rounded-2xl py-4 font-semibold hover:bg-zinc-100 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
