import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface DailyCheckInProps {
  onComplete: (meditated: boolean, duration?: number) => void;
  onSkip: () => void;
}

export const DailyCheckIn = ({ onComplete, onSkip }: DailyCheckInProps) => {
  const [step, setStep] = useState<'question' | 'duration'>('question');
  const [displayedText, setDisplayedText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [duration, setDuration] = useState('5');
  const [unit, setUnit] = useState<'minutes' | 'seconds' | 'hours'>('minutes');
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<'minutes' | 'seconds' | 'hours'>('minutes');

  const questionText = step === 'question' 
    ? 'Did you meditate today?' 
    : 'How long did you meditate?';

  useEffect(() => {
    setDisplayedText('');
    setShowButtons(false);
    setIsAnimating(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= questionText.length) {
        setDisplayedText(questionText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsAnimating(false);
        setTimeout(() => setShowButtons(true), 300);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [step]);

  const handleYes = () => {
    setStep('duration');
  };

  const handleNo = () => {
    onSkip();
  };

  const handleConfirm = () => {
    const durationValue = parseInt(duration) || 0;
    let durationInSeconds = 0;

    if (selectedUnit === 'seconds') {
      durationInSeconds = durationValue;
    } else if (selectedUnit === 'minutes') {
      durationInSeconds = durationValue * 60;
    } else if (selectedUnit === 'hours') {
      durationInSeconds = durationValue * 3600;
    }

    if (durationInSeconds > 0) {
      onComplete(true, durationInSeconds);
    }
  };

  const handleUnitSelect = (newUnit: 'minutes' | 'seconds' | 'hours') => {
    setSelectedUnit(newUnit);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(255, 255, 255, 0.02);
          }
          50% {
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.08), 0 0 100px rgba(255, 255, 255, 0.04);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cursor-blink::after {
          content: '';
          display: inline-block;
          width: 3px;
          height: 1em;
          background: white;
          margin-left: 8px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Ambient Orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-xl font-medium text-zinc-400">BeingOne</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {step === 'question' ? (
          <div className="w-full max-w-sm space-y-16">
            {/* Question Text */}
            <div className="text-center">
              <h2 className={`text-[2.75rem] leading-[1.1] font-extralight tracking-tight ${isAnimating ? 'cursor-blink' : ''}`}>
                {displayedText}
              </h2>
            </div>

            {/* Buttons */}
            {showButtons && (
              <div className="space-y-4 fade-in-up">
                <button
                  onClick={handleYes}
                  className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative flex items-center justify-between">
                    <span>Yes, I did</span>
                    <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
                
                <button
                  onClick={handleNo}
                  className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-zinc-500 hover:text-white hover:bg-white/[0.03] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="relative flex items-center justify-between">
                    <span>Not yet</span>
                    <ArrowRight size={20} className="opacity-40 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-16">
            {/* Question Text */}
            <div className="text-center">
              <h2 className={`text-[2.75rem] leading-[1.1] font-extralight tracking-tight ${isAnimating ? 'cursor-blink' : ''}`}>
                {displayedText}
              </h2>
            </div>

            {/* Duration Input */}
            {showButtons && (
              <div className="space-y-12 fade-in-up">
                {/* Number Input with Underline */}
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="5"
                    min="0"
                    className="w-full bg-transparent text-8xl font-extralight text-center focus:outline-none pb-4 tracking-tight"
                    autoFocus
                  />
                  <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
                </div>

                {/* Unit Selector - Segmented Control */}
                <div className="glass-morphism rounded-[2rem] p-1.5">
                  <div className="flex gap-1">
                    {(['seconds', 'minutes', 'hours'] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => handleUnitSelect(u)}
                        className={`flex-1 py-4 rounded-[1.6rem] font-medium text-sm tracking-wide transition-all duration-500 relative ${
                          selectedUnit === u
                            ? 'bg-white text-black'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {u.charAt(0).toUpperCase() + u.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  disabled={!duration || parseInt(duration) === 0}
                  className="w-full bg-white text-black rounded-[2rem] px-8 py-6 font-semibold text-lg tracking-wide hover:bg-zinc-100 transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer" />
                  <span className="relative">Continue</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Ambient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
