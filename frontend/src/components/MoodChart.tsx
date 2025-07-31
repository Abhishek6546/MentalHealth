import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

type MoodEntry = {
  date: string;
  mood: string;
};

const moodScale: Record<string, number> = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Anxious: 2,
  Sad: 1,
};

const moodColors: Record<string, string> = {
  Happy: "#10b981",    // Green
  Calm: "#06b6d4",     // Cyan  
  Neutral: "#6b7280",  // Gray
  Anxious: "#f59e0b",  // Amber
  Sad: "#ef4444",      // Red
};

const moodEmojis: Record<string, string> = {
  Happy: "😊",
  Calm: "😌", 
  Neutral: "😐",
  Anxious: "😰",
  Sad: "😢",
};

const MoodChart = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<{ date: string; moodScore: number; mood: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageMood, setAverageMood] = useState(0);
  const { mode } = useTheme();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/journal/moods/${userId}`);
        const raw = await res.json();

        const processed = raw.map((entry: MoodEntry) => ({
          date: new Date(entry.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          moodScore: moodScale[entry.mood] || 3,
          mood: entry.mood,
          fullDate: entry.date,
        }));

        setData(processed);
        
        // Calculate average mood
        const avg = processed.reduce((sum: number, entry: any) => sum + entry.moodScore, 0) / processed.length;
        setAverageMood(avg);
      } catch (error) {
        console.error("Failed to fetch mood data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchMoods();
    }
  }, [userId]);

  // Get mood distribution
  const getMoodDistribution = () => {
    const distribution: Record<string, number> = {};
    data.forEach(entry => {
      distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
    });
    return distribution;
  };

  const moodDistribution = getMoodDistribution();
  const totalEntries = data.length;

  // Get average mood label
  const getAverageMoodLabel = (score: number) => {
    if (score >= 4.5) return { label: "Very Positive", color: "text-green-600", emoji: "😊" };
    if (score >= 3.5) return { label: "Positive", color: "text-cyan-600", emoji: "😌" };
    if (score >= 2.5) return { label: "Neutral", color: "text-gray-600", emoji: "😐" };
    if (score >= 1.5) return { label: "Concerning", color: "text-amber-600", emoji: "😰" };
    return { label: "Needs Attention", color: "text-red-600", emoji: "😢" };
  };

  const avgMoodInfo = getAverageMoodLabel(averageMood);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          mode === "dark" 
            ? "bg-gray-800 border-gray-600 text-white" 
            : "bg-white border-gray-200 text-gray-800"
        }`}>
          <p className="font-semibold">{label}</p>
          <p className="flex items-center">
            <span className="mr-2">{moodEmojis[data.mood]}</span>
            <span style={{ color: moodColors[data.mood] }}>
              {data.mood}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={`max-w-4xl mx-auto mt-8 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border ${
        mode === "dark"
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`max-w-4xl mx-auto mt-8 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border text-center ${
        mode === "dark"
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }`}>
        <div className="text-6xl mb-4">📊</div>
        <h3 className={`text-xl font-semibold mb-2 ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
          No Mood Data Yet
        </h3>
        <p className={`${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Start journaling to see your mood trends over time
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto mt-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
        mode === "dark"
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }`}
    >
      {/* Header Section */}
      <div className={`p-6 rounded-t-3xl border-b ${
        mode === "dark" 
          ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-gray-700/50" 
          : "bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200/50"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
              <span className="text-xl text-white">📈</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Mood Over Time
              </h2>
              <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Track your emotional wellness journey
              </p>
            </div>
          </div>
          
          {/* Average Mood Badge */}
          <div className={`px-4 py-2 rounded-xl border ${
            mode === "dark"
              ? "bg-gray-700/50 border-gray-600/50"
              : "bg-white/80 border-gray-300/50"
          }`}>
            <div className="text-center">
              <div className="text-lg">{avgMoodInfo.emoji}</div>
              <div className={`text-xs font-semibold ${avgMoodInfo.color}`}>
                {avgMoodInfo.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl text-center border ${
            mode === "dark"
              ? "bg-gray-700/30 border-gray-600/50"
              : "bg-gray-50 border-gray-200/50"
          }`}>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {totalEntries}
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Total Entries
            </div>
          </div>
          
          <div className={`p-4 rounded-xl text-center border ${
            mode === "dark"
              ? "bg-gray-700/30 border-gray-600/50"
              : "bg-gray-50 border-gray-200/50"
          }`}>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {averageMood.toFixed(1)}
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Avg Score
            </div>
          </div>

          <div className={`p-4 rounded-xl text-center border ${
            mode === "dark"
              ? "bg-gray-700/30 border-gray-600/50"
              : "bg-gray-50 border-gray-200/50"
          }`}>
            <div className="text-lg">
              {Object.entries(moodDistribution).reduce((a, b) => moodDistribution[a[0]] > moodDistribution[b[0]] ? a : b, ["", 0])[0] && 
                moodEmojis[Object.entries(moodDistribution).reduce((a, b) => moodDistribution[a[0]] > moodDistribution[b[0]] ? a : b, ["", 0])[0]]
              }
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Most Common
            </div>
          </div>

          <div className={`p-4 rounded-xl text-center border ${
            mode === "dark"
              ? "bg-gray-700/30 border-gray-600/50"
              : "bg-gray-50 border-gray-200/50"
          }`}>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {Math.max(...data.map(d => d.moodScore)) - Math.min(...data.map(d => d.moodScore))}
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Mood Range
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={`p-6 rounded-2xl border ${
          mode === "dark"
            ? "bg-gray-700/20 border-gray-600/50"
            : "bg-gray-50/50 border-gray-200/50"
        }`}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mode === "dark" ? "#60a5fa" : "#3b82f6"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={mode === "dark" ? "#60a5fa" : "#3b82f6"} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke={mode === "dark" ? "#9ca3af" : "#6b7280"}
                tick={{ fill: mode === "dark" ? "#d1d5db" : "#374151", fontSize: 12 }}
                tickLine={{ stroke: mode === "dark" ? "#4b5563" : "#d1d5db" }}
              />
              <YAxis 
                domain={[1, 5]}
                stroke={mode === "dark" ? "#9ca3af" : "#6b7280"}
                tick={{ fill: mode === "dark" ? "#d1d5db" : "#374151", fontSize: 12 }}
                tickLine={{ stroke: mode === "dark" ? "#4b5563" : "#d1d5db" }}
                tickFormatter={(v) => {
                  return Object.keys(moodScale).find((k) => moodScale[k] === v) || "";
                }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="moodScore"
                stroke={mode === "dark" ? "#60a5fa" : "#3b82f6"}
                strokeWidth={3}
                fill="url(#moodGradient)"
                dot={{ 
                  fill: mode === "dark" ? "#60a5fa" : "#3b82f6", 
                  strokeWidth: 2,
                  stroke: mode === "dark" ? "#1f2937" : "#ffffff",
                  r: 5
                }}
                activeDot={{ 
                  r: 7, 
                  fill: mode === "dark" ? "#60a5fa" : "#3b82f6",
                  stroke: mode === "dark" ? "#1f2937" : "#ffffff",
                  strokeWidth: 3
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Distribution */}
        <div className="grid grid-cols-5 gap-2 mt-6">
          {Object.entries(moodScale).map(([mood, _]) => {
            const count = moodDistribution[mood] || 0;
            const percentage = totalEntries > 0 ? ((count / totalEntries) * 100).toFixed(0) : 0;
            
            return (
              <div
                key={mood}
                className={`p-3 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                  mode === "dark"
                    ? "bg-gray-700/40 hover:bg-gray-700/60"
                    : "bg-gray-100/80 hover:bg-gray-200/80"
                }`}
              >
                <div className="text-lg mb-1">{moodEmojis[mood]}</div>
                <div className={`text-xs font-semibold ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {mood}
                </div>
                <div className={`text-xs ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodChart; 