import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Stats as StatsType } from '../types';

type Period = 'week' | 'month' | '3month';

export const Stats = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [period, setPeriod] = useState<Period>('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const data = await apiService.getStats();
    setStats(data);
    setLoading(false);
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600">Loading...</div>
      </div>
    );
  }

  const getData = () => {
    switch (period) {
      case 'week':
        return stats.weeklyData;
      case 'month':
        return stats.monthlyData;
      case '3month':
        return stats.threeMonthData;
    }
  };

  const data = getData();
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 pb-24">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-zinc-500 text-sm">Track your meditation journey</p>
        </div>

        <div className="flex gap-2 bg-zinc-900/50 rounded-2xl p-1">
          <button
            onClick={() => setPeriod('week')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              period === 'week' ? 'bg-zinc-800 text-white' : 'text-zinc-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              period === 'month' ? 'bg-zinc-800 text-white' : 'text-zinc-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod('3month')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              period === '3month' ? 'bg-zinc-800 text-white' : 'text-zinc-600'
            }`}
          >
            3 Months
          </button>
        </div>

        <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800/50">
          <div className="flex items-end justify-between h-48 gap-1">
            {data.map((item, index) => {
              const height = (item.minutes / maxMinutes) * 100;
              const isHighest = item.minutes === maxMinutes && item.minutes > 0;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-40">
                    {item.minutes > 0 && (
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          isHighest
                            ? 'bg-gradient-to-t from-white to-zinc-400'
                            : 'bg-gradient-to-t from-zinc-700 to-zinc-800'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )}
                  </div>
                  {period === 'week' && (
                    <div className="text-xs text-zinc-600">
                      {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

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
