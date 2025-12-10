import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Brain, Target, TrendingUp, Zap, Heart, Shield, ChevronRight } from 'lucide-react';

interface Analysis {
  issue: string;
  category: string;
  summary: string;
  insights: string[];
  practicalSteps: {
    title: string;
    description: string;
    icon: string;
  }[];
  encouragement: string;
  confidence: number;
}

// Enhanced mock AI analysis generator that works for ANY input
const generateMockAnalysis = (userIssue: string): Analysis => {
  const issue = userIssue.toLowerCase();

  // Extract key themes from input
  const themes = {
    focus: issue.match(/focus|concentrate|distract|wander|attention/),
    sleep: issue.match(/sleep|tired|drowsy|fall asleep|sleepy/),
    anxiety: issue.match(/anxious|anxiety|worry|nervous|stress|overwhelm/),
    pain: issue.match(/pain|hurt|uncomfortable|ache|sore/),
    time: issue.match(/time|busy|schedule|rush|quick/),
    motivation: issue.match(/motivat|lazy|procrastinat|give up|quit/),
    progress: issue.match(/progress|improve|better|advanced|stuck/),
    emotion: issue.match(/emotion|feeling|sad|angry|frustrat|mood/),
    breathing: issue.match(/breath|breathing/),
    posture: issue.match(/posture|sit|position/),
    thoughts: issue.match(/thought|thinking|mind|mental/),
    beginner: issue.match(/beginner|start|new|first time|how to/),
  };

  // Determine primary category
  let category = 'General Practice';
  if (themes.focus) category = 'Focus & Concentration';
  else if (themes.sleep) category = 'Alertness & Energy';
  else if (themes.anxiety) category = 'Stress & Anxiety';
  else if (themes.pain) category = 'Physical Comfort';
  else if (themes.time) category = 'Time Management';
  else if (themes.motivation) category = 'Motivation';
  else if (themes.progress) category = 'Progress & Growth';
  else if (themes.emotion) category = 'Emotional Wellness';
  else if (themes.beginner) category = 'Getting Started';

  // Generate dynamic insights based on detected themes
  const insightPool = [
    // Focus insights
    themes.focus && "A wandering mind isn't failure - it's the training ground. Each time you notice and return, you're building the 'muscle' of awareness.",
    themes.focus && "The quality of meditation isn't measured by stillness, but by how gently you return when you drift.",
    themes.focus && "Distractions reveal where your energy is leaking. They're not obstacles but teachers showing you what needs attention.",

    // Sleep insights
    themes.sleep && "Drowsiness during practice often signals your body's genuine need for rest. Honor this message.",
    themes.sleep && "The boundary between deep relaxation and sleep is delicate. Finding this edge is itself a practice.",
    themes.sleep && "Your posture is speaking to your nervous system. Slight adjustments can shift drowsiness to alertness.",

    // Anxiety insights
    themes.anxiety && "Anxiety surfacing in meditation means you're finally slowing down enough to hear what's been there all along.",
    themes.anxiety && "The goal isn't to eliminate anxious thoughts, but to change your relationship with them.",
    themes.anxiety && "Your nervous system is learning a new pattern. Discomfort during this learning is natural and temporary.",

    // Pain insights
    themes.pain && "Physical discomfort is feedback, not failure. Your body is communicating - listen with curiosity, not judgment.",
    themes.pain && "There's a difference between 'edge' (productive) and 'injury' (harmful). Learning to distinguish them is wisdom.",
    themes.pain && "Comfort in meditation supports depth. There's no virtue in suffering when simple adjustments could help.",

    // Universal insights
    "Every challenge in meditation is an opportunity to practice what meditation teaches: patience, acceptance, curiosity.",
    "Your unique struggles are actually doorways to deeper practice. Generic 'perfect' sessions teach us less.",
    "Consistency beats intensity. A sustainable practice with challenges is more valuable than perfect sessions you can't maintain.",
  ].filter(Boolean);

  // Select 3 insights
  const insights = insightPool
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(insight => insight || "This experience is showing you exactly where growth is possible. Stay curious about what you're discovering.");

  // Generate dynamic practical steps
  const stepPool = [
    // Focus steps
    themes.focus && {
      title: 'Anchor Point Technique',
      description: 'Choose one specific sensation (breath at nostrils, chest rising, belly expanding) and return to this exact point each time you drift.',
      icon: 'target',
    },
    themes.focus && {
      title: 'Counting Meditation',
      description: 'Count breaths 1-10, then restart. When you lose count, notice without judgment and begin again at 1.',
      icon: 'hash',
    },

    // Sleep steps
    themes.sleep && {
      title: 'Optimal Timing',
      description: 'Meditate when naturally alert - usually morning or mid-afternoon. Avoid post-meal or pre-bed times initially.',
      icon: 'clock',
    },
    themes.sleep && {
      title: 'Posture Adjustment',
      description: 'Sit upright with spine straight but relaxed. If drowsy, try eyes slightly open with soft downward gaze.',
      icon: 'user',
    },

    // Anxiety steps
    themes.anxiety && {
      title: '4-7-8 Breathing Prep',
      description: 'Before meditating: inhale 4 counts, hold 7, exhale 8. Repeat 4 times to calm your nervous system.',
      icon: 'wind',
    },
    themes.anxiety && {
      title: 'Body Scan Grounding',
      description: 'When anxiety rises, scan your body for tension. Breathe into those areas, consciously softening with each exhale.',
      icon: 'scan',
    },

    // Pain steps
    themes.pain && {
      title: 'Experiment with Support',
      description: 'Try different positions and props. Use cushions, blocks, or chairs. Comfort enables focus.',
      icon: 'layers',
    },
    themes.pain && {
      title: 'Mindful Adjustment',
      description: "You can move during practice. Shift slowly and consciously rather than enduring pain that breaks concentration.",
      icon: 'move',
    },

    // Universal steps
    {
      title: 'Start Small, Build Gradually',
      description: 'Begin with 5-minute sessions. Master consistency at this duration before expanding. Small wins build momentum.',
      icon: 'trending-up',
    },
    {
      title: 'Daily Practice Ritual',
      description: 'Same time, same place daily. This consistency signals to your brain and body that meditation is non-negotiable.',
      icon: 'calendar',
    },
    {
      title: 'Progress Journal',
      description: 'Write 2-3 sentences after each session. Patterns invisible in the moment become clear over time.',
      icon: 'book',
    },
    {
      title: 'Self-Compassion Practice',
      description: 'Treat yourself as you would a good friend learning something new. Gentleness accelerates growth.',
      icon: 'heart',
    },
  ].filter(Boolean);

  // Select 4 practical steps
  const practicalSteps = (stepPool as any[])
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  // Generate contextual summary
  const summaries = [
    `What you're experiencing with ${category.toLowerCase()} is incredibly common. This challenge is actually a sign that you're engaging deeply with practice - not avoiding it.`,
    `The ${category.toLowerCase()} issue you're facing reveals an opportunity for growth. Every experienced meditator has navigated similar territory.`,
    `Your honesty about ${category.toLowerCase()} shows self-awareness. This awareness itself is meditation working - you're noticing patterns you might have missed before.`,
    `Challenges with ${category.toLowerCase()} are not obstacles to meditation - they ARE the meditation. How you work with this will define your practice.`,
  ];

  const encouragements = [
    "You're not failing at meditation - you're succeeding at being honest about your experience. This honesty is the foundation of growth.",
    "Every great meditator started exactly where you are. The difference is they kept showing up, adjusting, learning.",
    "Your commitment to understanding this challenge rather than giving up shows the dedication that transforms practice into mastery.",
    "This difficulty you're facing? It's temporary. Your willingness to work through it? That's building something permanent.",
    "Progress in meditation is rarely linear. Trust the process, even when it feels unclear. Your practice is working.",
  ];

  // Calculate mock confidence score (higher for more specific inputs)
  const wordCount = userIssue.trim().split(/\s+/).length;
  const confidence = Math.min(95, 70 + Math.floor(wordCount / 3) * 5);

  return {
    issue: userIssue,
    category,
    summary: summaries[Math.floor(Math.random() * summaries.length)],
    insights,
    practicalSteps,
    encouragement: encouragements[Math.floor(Math.random() * encouragements.length)],
    confidence,
  };
};

interface InsightsProps {
  onClose: () => void;
}

type ViewState = 'input' | 'processing' | 'analysis';

const Insights: React.FC<InsightsProps> = ({ onClose }) => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Processing animation effect
  useEffect(() => {
    if (viewState === 'processing') {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setViewState('analysis');
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleSubmit = () => {
    if (userInput.trim().length < 10) {
      return;
    }

    const mockAnalysis = generateMockAnalysis(userInput);
    setAnalysis(mockAnalysis);
    setViewState('processing');
    setProcessingProgress(0);
  };

  const handleStartOver = () => {
    setViewState('input');
    setUserInput('');
    setAnalysis(null);
    setProcessingProgress(0);
  };

  // Input View
  if (viewState === 'input') {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
        {/* Enhanced Ambient Background with gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
              animation: 'float 10s ease-in-out infinite 2s',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
              animation: 'pulse 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Premium Header with gradient */}
        <div className="sticky top-0 z-10 backdrop-blur-2xl bg-gradient-to-b from-black via-black/95 to-black/80 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="w-7 h-7 text-white relative z-10" />
                  <div className="absolute inset-0 blur-lg bg-white/20 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">AI Meditation Coach</h1>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Powered by Insight Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-12" style={{ animation: 'fade-in 0.6s ease-out' }}>
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-pink-500/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text">
              What's on your mind?
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
              Share any challenge, question, or experience from your meditation practice. Get personalized insights tailored to you.
            </p>
          </div>

          <div
            className="relative mb-6"
            style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl blur opacity-30" />

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe anything: struggles with focus, questions about technique, feelings during practice, or anything you're curious about..."
              className="relative w-full h-56 px-6 py-5 border border-white/10 rounded-3xl text-white placeholder-zinc-500 resize-none focus:outline-none focus:border-white/30 transition-all duration-300"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                backgroundColor: '#000000'
              }}
            />

            <div className="relative flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium transition-colors ${
                  userInput.length < 10 ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {userInput.length < 10 ? `${10 - userInput.length} more characters` : `${userInput.length} characters`}
                </span>
                {userInput.length >= 10 && (
                  <span className="text-xs text-green-500/70 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Ready
                  </span>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={userInput.trim().length < 10}
                className={`group relative px-8 py-3.5 rounded-full font-semibold transition-all duration-300 ${
                  userInput.trim().length < 10
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-white to-zinc-100 text-black hover:shadow-2xl hover:shadow-white/25 hover:scale-105 active:scale-100'
                }`}
              >
                {userInput.trim().length >= 10 && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <span className="relative flex items-center gap-2">
                  Get Insights
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Example prompts */}
          <div
            className="mt-12 space-y-3"
            style={{ animation: 'fade-in 0.6s ease-out 0.4s both' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-zinc-500" />
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Quick Start Examples</p>
            </div>
            <div className="grid gap-3">
              {[
                { text: 'I struggle to maintain focus during meditation', gradient: 'from-violet-500/10 to-purple-500/10' },
                { text: 'I feel anxious when I try to meditate', gradient: 'from-blue-500/10 to-cyan-500/10' },
                { text: 'I keep falling asleep during practice', gradient: 'from-pink-500/10 to-rose-500/10' },
                { text: 'How do I know if I\'m making progress?', gradient: 'from-green-500/10 to-emerald-500/10' },
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUserInput(example.text)}
                  className={`group text-left px-5 py-4 rounded-2xl bg-gradient-to-br ${example.gradient} border border-white/10 text-sm text-zinc-300 hover:border-white/30 hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span className="flex items-center justify-between">
                    <span>{example.text}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-30px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    );
  }

  // Enhanced Processing View
  if (viewState === 'processing') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Animated Background with multiple layers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              animation: 'pulse 2s ease-in-out infinite 0.5s',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          {/* Enhanced Animated Icon */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-transparent border-t-white/30 border-r-white/20"
                style={{ animation: 'spin 3s linear infinite' }}
              />

              {/* Middle pulsing ring */}
              <div className="absolute inset-2 w-28 h-28 rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-pink-500/20 blur-md animate-pulse" />

              {/* Center icon container */}
              <div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-xl"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <Sparkles className="w-14 h-14 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />

                {/* Orbiting particles */}
                <div
                  className="absolute inset-0"
                  style={{ animation: 'spin 4s linear infinite' }}
                >
                  <div className="absolute top-2 left-1/2 w-2 h-2 -ml-1 bg-violet-400 rounded-full blur-sm" />
                  <div className="absolute bottom-2 left-1/2 w-2 h-2 -ml-1 bg-blue-400 rounded-full blur-sm" />
                  <div className="absolute top-1/2 right-2 w-2 h-2 -mt-1 bg-pink-400 rounded-full blur-sm" />
                  <div className="absolute top-1/2 left-2 w-2 h-2 -mt-1 bg-cyan-400 rounded-full blur-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Processing Text with gradient */}
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text">
            Analyzing Your Practice
          </h2>
          <p className="text-zinc-400 text-sm mb-3">
            Processing your unique experience...
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  style={{
                    animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="max-w-sm mx-auto">
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl border border-white/10">
              <div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${processingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-zinc-500">Insight Engine</span>
              <span className="text-sm font-semibold text-white">{processingProgress}%</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 0.5;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(5deg);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            50% {
              transform: translateY(-8px);
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }

  // Ultra-Premium Analysis View
  if (viewState === 'analysis' && analysis) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
        {/* Enhanced Ambient Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Premium Header */}
        <div className="sticky top-0 z-10 backdrop-blur-2xl bg-gradient-to-b from-black via-black/95 to-black/80 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 blur-lg bg-white/20" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">Your Personalized Insights</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500/70 font-medium">Analysis Complete</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleStartOver}
                className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium"
              >
                New Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-8 pb-12">
          {/* Confidence Score Badge */}
          <div
            className="flex justify-center mb-6"
            style={{ animation: 'fade-in 0.4s ease-out' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-pink-500/20 border border-white/20 backdrop-blur-xl">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">
                {analysis.confidence}% Confidence Match
              </span>
            </div>
          </div>

          {/* Category & User's Issue */}
          <div
            className="mb-8"
            style={{ animation: 'fade-in 0.6s ease-out' }}
          >
            <div className="inline-block mb-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30">
              <span className="text-xs font-bold text-violet-200 uppercase tracking-wider">{analysis.category}</span>
            </div>
            <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl" />
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Your Challenge</p>
              <p className="text-white/90 italic leading-relaxed relative z-10">"{analysis.issue}"</p>
            </div>
          </div>

          {/* Summary with enhanced styling */}
          <div
            className="mb-8"
            style={{ animation: 'fade-in 0.6s ease-out 0.1s both' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-xl">
                <Brain className="w-5 h-5 text-blue-300" />
              </div>
              <h2 className="text-xl font-bold text-white">Understanding Your Experience</h2>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <p className="text-zinc-300 leading-relaxed">{analysis.summary}</p>
            </div>
          </div>

          {/* Key Insights with premium cards */}
          <div
            className="mb-8"
            style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center backdrop-blur-xl">
                <Sparkles className="w-5 h-5 text-violet-300" />
              </div>
              <h2 className="text-xl font-bold text-white">Key Insights</h2>
            </div>
            <div className="space-y-4">
              {analysis.insights.map((insight, index) => (
                <div
                  key={index}
                  className="group relative p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl overflow-hidden"
                  style={{ animation: `fade-in 0.5s ease-out ${0.3 + index * 0.1}s both` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex gap-4 relative z-10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-500/40 flex items-center justify-center">
                      <span className="text-sm font-bold text-violet-200">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed flex-1">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Steps with icons */}
          <div
            className="mb-8"
            style={{ animation: 'fade-in 0.6s ease-out 0.4s both' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center backdrop-blur-xl">
                <Target className="w-5 h-5 text-pink-300" />
              </div>
              <h2 className="text-xl font-bold text-white">Action Steps</h2>
            </div>
            <div className="grid gap-4">
              {analysis.practicalSteps.map((step, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl overflow-hidden"
                  style={{ animation: `fade-in 0.5s ease-out ${0.5 + index * 0.1}s both` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex gap-5 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center backdrop-blur-xl">
                      <span className="text-lg font-bold bg-gradient-to-br from-pink-200 to-rose-200 bg-clip-text text-transparent">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2 text-lg">{step.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Encouragement */}
          <div
            className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 backdrop-blur-xl overflow-hidden"
            style={{ animation: 'fade-in 0.6s ease-out 0.8s both' }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 to-transparent" />
            <div className="flex items-start gap-5 relative z-10">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 border border-green-500/40 flex items-center justify-center backdrop-blur-xl">
                <Heart className="w-7 h-7 text-green-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                  Keep Growing
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </h3>
                <p className="text-zinc-300 leading-relaxed">{analysis.encouragement}</p>
              </div>
            </div>
          </div>

          {/* Premium Action Buttons */}
          <div
            className="mt-10 flex gap-4"
            style={{ animation: 'fade-in 0.6s ease-out 1s both' }}
          >
            <button
              onClick={handleStartOver}
              className="flex-1 group relative px-6 py-4 rounded-2xl border border-white/20 text-white hover:bg-white/5 transition-all duration-300 font-semibold overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">New Analysis</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-white to-zinc-100 text-black hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 font-bold hover:scale-105 active:scale-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <span className="relative">Start Practicing</span>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default Insights;
