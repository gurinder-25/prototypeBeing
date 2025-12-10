import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, ChevronRight } from 'lucide-react';

interface GuideArticle {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  content: string[];
  author: string;
}

// Mock data for meditation guides
const mockGuides: GuideArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Meditation',
    description: 'A beginner-friendly introduction to meditation practice and its foundational principles.',
    readTime: '3 min read',
    category: 'Beginner',
    author: 'BeingOne Team',
    content: [
      'Meditation is a practice of focused attention that brings clarity and calmness to your mind. It\'s not about stopping your thoughts, but learning to observe them without judgment.',
      'Start with just 5 minutes a day. Find a quiet space, sit comfortably, and focus on your breath. When your mind wanders (and it will), gently bring your attention back to your breathing.',
      'Consistency matters more than duration. A daily 5-minute practice is more valuable than an occasional 30-minute session.',
      'Be patient with yourself. Meditation is a skill that develops over time. Some days will feel easier than others, and that\'s completely normal.',
    ],
  },
  {
    id: '2',
    title: 'Breathing Techniques for Deep Relaxation',
    description: 'Learn powerful breathing methods to reduce stress and achieve deeper states of calm.',
    readTime: '4 min read',
    category: 'Technique',
    author: 'BeingOne Team',
    content: [
      'Your breath is the most powerful tool for instant relaxation. By controlling your breath, you can directly influence your nervous system.',
      '4-7-8 Breathing: Inhale through your nose for 4 counts, hold for 7 counts, exhale through your mouth for 8 counts. Repeat 4 times.',
      'Box Breathing: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. This technique is used by Navy SEALs to stay calm under pressure.',
      'Diaphragmatic Breathing: Place one hand on your chest and one on your belly. Breathe deeply so that only your belly hand moves. This activates your parasympathetic nervous system.',
      'Practice these techniques daily, and you\'ll have instant stress-relief tools available whenever you need them.',
    ],
  },
  {
    id: '3',
    title: 'Dealing with Racing Thoughts',
    description: 'Practical strategies to manage a busy mind during meditation sessions.',
    readTime: '3 min read',
    category: 'Common Issues',
    author: 'BeingOne Team',
    content: [
      'Racing thoughts are completely normal, especially when you\'re starting out. Your mind is used to being busy, and meditation asks it to slow down.',
      'Don\'t fight your thoughts. Instead, imagine them as clouds passing through the sky. Observe them without engaging, and they\'ll naturally drift away.',
      'Use an anchor: When thoughts become overwhelming, return to a focal point—your breath, a mantra, or a physical sensation like your hands resting on your knees.',
      'Label your thoughts: When a thought appears, mentally note it as "thinking" or "planning" or "worrying," then gently return to your breath.',
      'Remember: The goal isn\'t to have zero thoughts. It\'s to change your relationship with your thoughts.',
    ],
  },
  {
    id: '4',
    title: 'Creating Your Sacred Space',
    description: 'Design a dedicated meditation environment that supports your practice.',
    readTime: '3 min read',
    category: 'Environment',
    author: 'BeingOne Team',
    content: [
      'Your environment significantly impacts your meditation quality. A dedicated space signals to your brain that it\'s time to practice.',
      'Choose a quiet corner free from interruptions. It doesn\'t need to be large—even a small cushion in a quiet corner works perfectly.',
      'Keep it minimal and clean. Remove distractions and clutter. Consider adding elements that promote calm: a candle, incense, or a small plant.',
      'Make it comfortable. Use cushions, blankets, or a meditation bench to support proper posture without strain.',
      'Personalize it with meaningful items: inspirational quotes, calming images, or objects that remind you why you meditate.',
      'The most important element is consistency—use the same space daily to build a strong meditation habit.',
    ],
  },
  {
    id: '5',
    title: 'Body Scan Meditation',
    description: 'A guided technique to release physical tension and cultivate body awareness.',
    readTime: '4 min read',
    category: 'Technique',
    author: 'BeingOne Team',
    content: [
      'Body scan meditation helps you develop awareness of physical sensations and release accumulated tension.',
      'Start by lying down or sitting comfortably. Close your eyes and take three deep breaths.',
      'Begin at your toes. Notice any sensations—warmth, coolness, tingling, or tension. Don\'t judge, just observe.',
      'Slowly move your attention up through your feet, ankles, calves, knees, thighs. Spend 30-60 seconds on each area.',
      'Continue through your torso, hands, arms, shoulders, neck, and finally your face and head.',
      'If you notice tension, breathe into that area and imagine it softening and releasing with each exhale.',
      'This practice is excellent before sleep or when feeling physically stressed.',
    ],
  },
  {
    id: '6',
    title: 'Meditation for Better Sleep',
    description: 'Evening practices to calm your mind and prepare for restful sleep.',
    readTime: '3 min read',
    category: 'Sleep',
    author: 'BeingOne Team',
    content: [
      'Meditation before bed can significantly improve sleep quality by calming your nervous system and quieting mental chatter.',
      'Practice 15-30 minutes before your target sleep time. This creates a buffer between daily activities and rest.',
      'Use gentle techniques: Focus on slow, deep breathing or a body scan rather than energizing practices.',
      'Create a ritual: Dim the lights, put away devices, perhaps use calming essential oils like lavender.',
      'If you wake during the night with racing thoughts, return to your breath. Count breaths backward from 100.',
      'Consistency is key—your body will learn to associate this practice with sleep, making it easier to drift off naturally.',
    ],
  },
];

interface GuidesProps {
  onClose: () => void;
}

const Guides: React.FC<GuidesProps> = ({ onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  const handleArticleClick = (article: GuideArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // Article List View
  if (!selectedArticle) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-40 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/80 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-white" />
                <h1 className="text-2xl font-semibold text-white">Meditation Guides</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-2xl mx-auto px-6 py-8 pb-12">
          <p className="text-zinc-400 mb-8 text-center">
            Discover practical techniques and wisdom to deepen your practice
          </p>

          <div className="space-y-4">
            {mockGuides.map((guide, index) => (
              <div
                key={guide.id}
                className="group cursor-pointer"
                onClick={() => handleArticleClick(guide)}
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                  {/* Shimmer Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)',
                      animation: 'shimmer 3s infinite',
                    }}
                  />

                  <div className="relative p-6">
                    {/* Category Badge */}
                    <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-xs font-medium text-white/70">{guide.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {guide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{guide.description}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{guide.readTime}</span>
                        </div>
                        <span>•</span>
                        <span>{guide.author}</span>
                      </div>

                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Article Detail View
  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Guides</span>
          </button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-2xl mx-auto px-6 py-8 pb-12">
        {/* Category Badge */}
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs font-medium text-white/70">{selectedArticle.category}</span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          style={{ animation: 'fade-in 0.6s ease-out' }}
        >
          {selectedArticle.title}
        </h1>

        {/* Meta Info */}
        <div
          className="flex items-center gap-4 text-sm text-zinc-500 mb-8 pb-8 border-b border-white/10"
          style={{ animation: 'fade-in 0.6s ease-out 0.1s both' }}
        >
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{selectedArticle.readTime}</span>
          </div>
          <span>•</span>
          <span>{selectedArticle.author}</span>
        </div>

        {/* Article Content */}
        <div className="space-y-6">
          {selectedArticle.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-zinc-300 leading-relaxed text-base"
              style={{
                animation: `fade-in 0.6s ease-out ${0.2 + index * 0.1}s both`,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
          style={{ animation: 'fade-in 0.6s ease-out 1s both' }}
        >
          <p className="text-center text-zinc-400 text-sm">
            Ready to practice? Start a meditation session now.
          </p>
        </div>
      </article>

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
};

export default Guides;
