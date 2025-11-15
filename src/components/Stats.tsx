import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Stats as StatsType } from '../types';

export const Stats = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [calendarData, setCalendarData] = useState<{ meditatedDates: string[]; missedDates: string[] } | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadCalendarData();
  }, [currentDate]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await apiService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCalendarData = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const data = await apiService.getCalendarData(year, month);
      setCalendarData(data);
    } catch (error) {
      console.error('Failed to load calendar data:', error);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600">Loading...</div>
      </div>
    );
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const availableYears = [2024, 2025];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isMeditationDay = (year: number, month: number, day: number) => {
    if (!calendarData) return false;
    const dateStr = formatDate(year, month, day);
    return calendarData.meditatedDates.includes(dateStr);
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const isFutureDate = (year: number, month: number, day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate > today;
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const hasMeditated = isMeditationDay(year, month, day);
      const isCurrentDay = isToday(year, month, day);
      const isFuture = isFutureDate(year, month, day);

      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center text-sm font-medium transition-all ${
            isFuture
              ? 'text-zinc-700 cursor-not-allowed'
              : hasMeditated
              ? 'bg-white text-black rounded-full'
              : isCurrentDay
              ? 'text-white border border-zinc-700 rounded-full'
              : 'text-zinc-500'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex));
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth()));
    setShowYearPicker(false);
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 pb-24">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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
          <h1 className="text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-zinc-500 text-sm">Track your meditation journey</p>
        </div>

        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800/50 overflow-hidden scale-100 origin-top">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={handlePreviousMonth}
                className="w-9 h-9 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowMonthPicker(true);
                    setShowYearPicker(false);
                  }}
                  className="text-base font-semibold hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800/30"
                >
                  {months[currentMonth]}
                </button>
                <span className="text-zinc-600">|</span>
                <button
                  onClick={() => {
                    setShowYearPicker(true);
                    setShowMonthPicker(false);
                  }}
                  className="text-base font-semibold hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800/30"
                >
                  {currentYear}
                </button>
              </div>

              <button
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mb-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-[10px] font-semibold text-zinc-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Bottom Sheet for Month Picker */}
        {showMonthPicker && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowMonthPicker(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
              <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Select Month</h3>
                    <button
                      onClick={() => setShowMonthPicker(false)}
                      className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto scrollbar-hide">
                    <div className="space-y-2">
                      {months.map((month, index) => (
                        <button
                          key={index}
                          onClick={() => handleMonthSelect(index)}
                          className={`w-full py-4 px-5 rounded-2xl text-base font-medium transition-all text-left ${
                            index === currentMonth
                              ? 'bg-white text-black'
                              : 'bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-300'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom Sheet for Year Picker */}
        {showYearPicker && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowYearPicker(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
              <div className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-w-md mx-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Select Year</h3>
                    <button
                      onClick={() => setShowYearPicker(false)}
                      className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-800 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto scrollbar-hide">
                    <div className="space-y-2">
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`w-full py-4 px-5 rounded-2xl text-base font-medium transition-all text-left ${
                            year === currentYear
                              ? 'bg-white text-black'
                              : 'bg-zinc-800/30 hover:bg-zinc-800/50 text-zinc-300'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800/50">
            <div className="text-zinc-500 text-sm mb-2">Total Days</div>
            <div className="text-3xl font-bold">{stats.totalDays}</div>
          </div>

          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800/50">
            <div className="text-zinc-500 text-sm mb-2">Missed Days</div>
            <div className="text-3xl font-bold">{stats.missedDays}</div>
          </div>

          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800/50">
            <div className="text-zinc-500 text-sm mb-2">Total Minutes</div>
            <div className="text-3xl font-bold">{stats.totalMinutes}</div>
          </div>

          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800/50">
            <div className="text-zinc-500 text-sm mb-2">Avg. Duration</div>
            <div className="text-3xl font-bold">{stats.avgDuration}m</div>
          </div>
        </div>
      </div>
    </div>
  );
};
