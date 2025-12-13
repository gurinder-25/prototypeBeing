import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Analysis {
  understanding: string;
  insights: string[];
  actionableSteps: string[];
}

// Mock analysis generator
const generateMockAnalysis = (userInput: string): Analysis => {
  return {
    understanding: "What you're experiencing is incredibly common among meditators at all levels. The mind's tendency to wander isn't a failure - it's actually the training ground for developing awareness. Each time you notice your attention has drifted and gently bring it back, you're strengthening your capacity for presence and focus.",
    insights: [
      "A wandering mind during meditation is not a sign of doing it wrong - it's completely natural and part of the process",
      "The real practice happens in the moment you notice you've drifted and choose to return your attention",
      "Building consistency matters more than the quality of any single session - progress comes from showing up regularly",
      "Your challenges are unique opportunities to develop patience, self-compassion, and deeper understanding"
    ],
    actionableSteps: [
      "Start with just 5 minutes daily at the same time each day to build a sustainable habit",
      "Choose one anchor point (breath, body sensation, sound) and gently return to it when you notice you've drifted",
      "Practice self-compassion when your mind wanders - treat yourself with the same kindness you'd offer a good friend",
      "Keep a simple practice journal noting what you observe, without judgment or expectation"
    ]
  };
};

interface InsightsProps {
  onClose: () => void;
}

type ViewState = 'input' | 'analyzing' | 'results';

const Insights: React.FC<InsightsProps> = ({ onClose }) => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showProceed, setShowProceed] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analyzingDots, setAnalyzingDots] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const questionTexts = [
    'Need help in meditating?',
    'Want more help? Happy to help more!',
    'What else can I help you with?',
    'Any other questions? I\'m here for you!',
  ];

  const questionText = questionTexts[Math.min(questionCount, questionTexts.length - 1)];

  // Typing animation for question
  useEffect(() => {
    if (viewState === 'input') {
      setDisplayedQuestion('');
      setShowInput(false);
      setShowProceed(false);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= questionText.length) {
          setDisplayedQuestion(questionText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setShowInput(true);
            // Auto-focus the input
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }, 300);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [viewState]);

  // Show proceed button when user starts typing
  useEffect(() => {
    if (userInput.trim().length > 10) {
      setShowProceed(true);
    } else {
      setShowProceed(false);
    }
  }, [userInput]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [userInput]);

  // Analyzing animation
  useEffect(() => {
    if (viewState === 'analyzing') {
      let dotCount = 0;
      const dotsInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setAnalyzingDots('.'.repeat(dotCount));
      }, 500);

      // Simulate analysis time
      const analysisTimeout = setTimeout(() => {
        const mockAnalysis = generateMockAnalysis(userInput);
        setAnalysis(mockAnalysis);
        setViewState('results');
      }, 3000);

      return () => {
        clearInterval(dotsInterval);
        clearTimeout(analysisTimeout);
      };
    }
  }, [viewState, userInput]);

  const handleProceed = () => {
    if (userInput.trim().length > 10) {
      setViewState('analyzing');
    }
  };

  const handleStartOver = () => {
    setViewState('input');
    setUserInput('');
    setAnalysis(null);
    setQuestionCount(prev => prev + 1);
  };

  // Input View
  if (viewState === 'input') {
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
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
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
          .glow-orb {
            animation: glow-pulse 4s ease-in-out infinite;
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
          .fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          textarea {
            caret-color: white;
          }
          textarea::placeholder {
            opacity: 0;
          }
          /* Hide scrollbar */
          *::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
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
          <div className="px-6 flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-medium text-zinc-400">Insights</h1>
          </div>
        </div>

        {/* Main Content - Top Left Alignment */}
        <div className="relative z-10 flex-1 px-6 pt-8 pb-4 flex flex-col overflow-y-auto overflow-x-hidden">
          {/* Question Text - Top Left */}
          <div className="mb-8">
            <h2 className={`text-[2rem] leading-[1.2] font-extralight tracking-tight ${!showInput ? 'cursor-blink' : ''}`}>
              {displayedQuestion}
            </h2>
          </div>

          {/* Input Area - Invisible textarea that looks like plain text */}
          {showInput && (
            <div className="fade-in-up pb-4">
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full bg-transparent text-lg font-light leading-relaxed focus:outline-none resize-none text-white overflow-hidden"
                style={{ caretColor: 'white', height: 'auto' }}
                rows={1}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Proceed Button - Bottom */}
        {showProceed && (
          <div className="relative z-10 px-6 pb-8 fade-in-up">
            <button
              onClick={handleProceed}
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center justify-between">
                <span>Continue</span>
                <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>
        )}

        {/* Bottom Ambient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  // Analyzing View
  if (viewState === 'analyzing') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center max-w-md mx-auto relative overflow-hidden">
        <style>{`
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 40px rgba(255, 255, 255, 0.05), 0 0 80px rgba(255, 255, 255, 0.02);
            }
            50% {
              box-shadow: 0 0 50px rgba(255, 255, 255, 0.08), 0 0 100px rgba(255, 255, 255, 0.04);
            }
          }
          .glow-orb {
            animation: glow-pulse 4s ease-in-out infinite;
          }
        `}</style>

        {/* Ambient Orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

        <div className="text-center">
          <h2 className="text-[2.75rem] leading-[1.1] font-extralight tracking-tight">
            Analysing{analyzingDots}
          </h2>
        </div>
      </div>
    );
  }

  // Results View
  if (viewState === 'results' && analysis) {
    return (
      <div className="min-h-screen bg-black text-white max-w-md mx-auto relative overflow-hidden">
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
          .glow-orb {
            animation: glow-pulse 4s ease-in-out infinite;
          }
          .fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
          /* Hide scrollbar */
          *::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
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
          <div className="px-6 flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-medium text-zinc-400">Your Insights</h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10 overflow-y-auto overflow-x-hidden px-6 pb-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {/* Understanding Section */}
          <div className="mb-12 fade-in-up">
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
              Understanding of Your Experience
            </h3>
            <p className="text-base leading-relaxed text-zinc-300 font-light">
              {analysis.understanding}
            </p>
          </div>

          {/* Insights Section */}
          <div className="mb-12 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
              Insights
            </h3>
            <div className="space-y-4">
              {analysis.insights.map((insight, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white mt-2" />
                  <p className="text-base leading-relaxed text-zinc-300 font-light flex-1">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Steps Section */}
          <div className="mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
              Actionable Steps
            </h3>
            <div className="space-y-4">
              {analysis.actionableSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full glass-morphism flex items-center justify-center text-xs font-medium text-zinc-400 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-base leading-relaxed text-zinc-300 font-light flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mt-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleStartOver}
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center justify-between">
                <span>New Question</span>
                <ArrowRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>

            <button
              onClick={onClose}
              className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-zinc-500 hover:text-white hover:bg-white/[0.03] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="relative flex items-center justify-between">
                <span>Close</span>
                <ArrowRight size={20} className="opacity-40 group-hover:opacity-60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Ambient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  return null;
};

export default Insights;
