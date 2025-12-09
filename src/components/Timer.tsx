import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { apiService } from '../services/apiService';

type Mode = 'stopwatch' | 'timer';

export const Timer = () => {
  const [mode, setMode] = useState<Mode>('stopwatch');
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTimerSetup, setShowTimerSetup] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('5');
  const [inputSeconds, setInputSeconds] = useState('0');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => {
          const next = prev + 1;
          if (mode === 'timer' && next >= targetTime && targetTime > 0) {
            setIsRunning(false);
            playCompletionSound();
            return next;
          }
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, targetTime]);

  useEffect(() => {
    if (mode === 'timer' && time >= targetTime && targetTime > 0 && !showSuccess) {
      handleTimerComplete();
    }
  }, [time, targetTime, mode, showSuccess]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setTime(0);
    setTargetTime(0);
    setIsRunning(false);
    setShowSuccess(false);
  };

  const handleStartTimer = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalSeconds = mins * 60 + secs;

    if (totalSeconds > 0) {
      setTargetTime(totalSeconds);
      setTime(0);
      setShowTimerSetup(false);
      setIsRunning(true);
    }
  };

  const handleStartPause = () => {
    if (mode === 'timer' && targetTime === 0) {
      setShowTimerSetup(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleStop = async () => {
    if (time > 0) {
      setShowSuccess(true);
      await apiService.saveSession(time);

      setTimeout(() => {
        setShowSuccess(false);
        setTime(0);
        setTargetTime(0);
        setIsRunning(false);
      }, time >= targetTime && mode === 'timer' ? 10000 : 3000);
    } else {
      setTime(0);
      setTargetTime(0);
      setIsRunning(false);
    }
  };

  const handleTimerComplete = async () => {
    setShowSuccess(true);
    await apiService.saveSession(time);

    setTimeout(() => {
      setShowSuccess(false);
      setTime(0);
      setTargetTime(0);
      setIsRunning(false);
    }, 10000);
  };

  const playCompletionSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = 528;
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 1);
        }, i * 3000);
      }
    } catch (e) {
      console.log('Audio context not available');
    }
  };

  const getProgress = () => {
    if (mode === 'stopwatch') {
      return Math.min((time / 3600) * 360, 360);
    } else {
      return targetTime > 0 ? (time / targetTime) * 360 : 0;
    }
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 pt-8 pb-24 relative overflow-hidden">
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
        /* Hide number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold tracking-wide mb-8">BeingOne</h1>

        <div className="flex gap-2 bg-zinc-900/50 rounded-2xl p-1 mb-12">
          <button
            onClick={() => handleModeChange('stopwatch')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              mode === 'stopwatch' ? 'bg-zinc-800 text-white' : 'text-zinc-600'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => handleModeChange('timer')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              mode === 'timer' ? 'bg-zinc-800 text-white' : 'text-zinc-600'
            }`}
          >
            Timer
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-zinc-900"
              />

              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 360)}`}
                className="transition-all duration-1000 ease-out"
              />

              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#a3a3a3" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-light tracking-wider mb-2">
                  {formatTime(time)}
                </div>
                <div className="text-zinc-600 text-sm tracking-widest uppercase">
                  {isRunning ? 'Breathing' : time > 0 ? 'Paused' : 'Ready'}
                </div>
              </div>
            </div>
          </div>

          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in rounded-3xl">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
                  <div className="text-4xl">✓</div>
                </div>
                <div className="text-2xl font-semibold">Session Complete</div>
                <div className="text-zinc-400">{formatTime(time)} of mindfulness</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2">
            {time > 0 && (
              <button
                onClick={handleStop}
                className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-all"
              >
                <RotateCcw size={20} />
              </button>
            )}

            <button
              onClick={handleStartPause}
              disabled={showSuccess}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-100 transition-all shadow-2xl shadow-white/10 disabled:opacity-50"
            >
              {isRunning ? (
                <Pause size={20} fill="black" />
              ) : (
                <Play size={20} fill="black" className="ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Timer Setup */}
      {showTimerSetup && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowTimerSetup(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
            <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Set Timer</h3>
                  <button
                    onClick={() => setShowTimerSetup(false)}
                    className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="space-y-5 mb-6">
                  <div>
                    <label className="text-zinc-500 text-sm mb-3 block font-medium">Minutes</label>
                    <input
                      type="number"
                      value={inputMinutes}
                      onChange={(e) => setInputMinutes(e.target.value)}
                      min="0"
                      max="999"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-4 py-4 text-white text-center text-2xl font-semibold focus:outline-none focus:border-zinc-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-500 text-sm mb-3 block font-medium">Seconds</label>
                    <input
                      type="number"
                      value={inputSeconds}
                      onChange={(e) => setInputSeconds(e.target.value)}
                      min="0"
                      max="59"
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl px-4 py-4 text-white text-center text-2xl font-semibold focus:outline-none focus:border-zinc-600 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleStartTimer}
                  className="w-full bg-white text-black rounded-2xl py-4 font-semibold text-base hover:bg-zinc-100 transition-all"
                >
                  Start Timer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
