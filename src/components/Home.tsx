import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const quotes = [
  {
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh"
  },
  {
    text: "Meditation is not evasion; it is a serene encounter with reality.",
    author: "Thích Nhất Hạnh"
  },
  {
    text: "In the midst of movement and chaos, keep stillness inside of you.",
    author: "Deepak Chopra"
  },
  {
    text: "Meditation is the tongue of the soul and the language of our spirit.",
    author: "Jeremy Taylor"
  },
  {
    text: "The thing about meditation is you become more and more you.",
    author: "David Lynch"
  },
  {
    text: "Quiet the mind, and the soul will speak.",
    author: "Ma Jaya Sati Bhagavati"
  },
  {
    text: "Meditation brings wisdom; lack of meditation leaves ignorance.",
    author: "Buddha"
  },
  {
    text: "Your calm mind is the ultimate weapon against your challenges.",
    author: "Bryant McGill"
  }
];

interface HomeProps {
  onOpenGuides: () => void;
  onOpenInsights: () => void;
}

export const Home = ({ onOpenGuides, onOpenInsights }: HomeProps) => {
  const { user } = useAuth();
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setIsChanging(false);
      }, 500);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleGuides = () => {
    onOpenGuides();
  };

  const handleInsights = () => {
    onOpenInsights();
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col px-6 relative overflow-hidden">
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
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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
        .fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
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
        .quote-transition {
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        .quote-fade-out {
          opacity: 0;
          transform: translateY(-10px);
        }
      `}</style>

      {/* Ambient Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-60 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Header Section */}
        <div className="relative z-10 pt-8 pb-4 fade-in">
          <h1 className="text-xl font-medium text-zinc-400 mb-4">BeingOne</h1>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-light tracking-tight">
              Hi, <span className="font-medium">{user?.name || user?.username || 'there'}</span>
            </h2>
            <Sparkles size={24} className="text-zinc-600 float-animation" />
          </div>
        </div>

        {/* Main Content - Quote Section */}
        <div className="relative z-10 py-4">
          <div className="w-full max-w-lg mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-morphism rounded-[2.5rem] p-6 relative overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Quote Label */}
              <div className="flex items-center gap-2 mb-4">
                
                <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Daily Wisdom</span>
              </div>

              {/* Quote Content */}
              <div className={`quote-transition ${isChanging ? 'quote-fade-out' : ''}`}>
                <blockquote className="text-xl font-light leading-relaxed tracking-tight mb-4 text-zinc-100">
                  "{currentQuote.text}"
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
                  <p className="text-sm text-zinc-500 font-medium">— {currentQuote.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="relative z-10 space-y-3 pt-4 pb-8 fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleGuides}
            className="w-full glass-morphism rounded-[2rem] p-5 hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
                  <BookOpen size={20} className="text-zinc-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-medium tracking-tight mb-0.5">Guides</h3>
                  <p className="text-sm text-zinc-600 group-hover:text-zinc-500 transition-colors duration-500">Learn meditation techniques</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>

          <button
            onClick={handleInsights}
            className="w-full glass-morphism rounded-[2rem] p-5 hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
                  <Lightbulb size={20} className="text-zinc-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-medium tracking-tight mb-0.5">Insights</h3>
                  <p className="text-sm text-zinc-600 group-hover:text-zinc-500 transition-colors duration-500">Discover mindfulness wisdom</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
