import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";

interface StreakData {
  totalDays: number;
  streak: number;
}

const HabitTracker = () => {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { mode } = useTheme();

  useEffect(() => {
    const fetchStreak = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

        const res = await fetch(`${apiUrl}api/journal/streak`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch streak data');
        }
   
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching streak data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [token]);

  // Show loading state instead of null
  if (loading) {
    return (
      <div className={`h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
        mode === "dark" 
          ? "bg-gray-800/50 border-gray-700/50" 
          : "bg-white/70 border-gray-200/50"
      }`}>
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>Loading habit tracker...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
        mode === "dark" 
          ? "bg-gray-800/50 border-gray-700/50" 
          : "bg-white/70 border-gray-200/50"
      }`}>
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-red-500 text-2xl">⚠️</div>
            <p className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>Failed to load habit data</p>
          </div>
        </div>
      </div>
    );
  }

  // Show default state if no data
  if (!data) {
    return (
      <div className={`h-full rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
        mode === "dark" 
          ? "bg-gray-800/50 border-gray-700/50" 
          : "bg-white/70 border-gray-200/50"
      }`}>
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl">🌱</div>
            <p className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>Start your habit journey!</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate streak visualization
  const maxDisplayDays = 14;
  const streakDays = Math.min(data.streak, maxDisplayDays);
  const streakArray = Array.from({ length: maxDisplayDays }, (_, i) => i < streakDays);

  // Get streak level and styling
  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { 
      level: "🏆 Champion", 
      color: "from-purple-500 to-pink-600",
      bgColor: mode === "dark" ? "from-purple-900/30 to-pink-900/30" : "from-purple-50 to-pink-50",
      borderColor: mode === "dark" ? "border-purple-800/50" : "border-purple-200/50"
    };
    if (streak >= 14) return { 
      level: "⭐ Master", 
      color: "from-blue-500 to-cyan-600",
      bgColor: mode === "dark" ? "from-blue-900/30 to-cyan-900/30" : "from-blue-50 to-cyan-50",
      borderColor: mode === "dark" ? "border-blue-800/50" : "border-blue-200/50"
    };
    if (streak >= 7) return { 
      level: "🔥 On Fire", 
      color: "from-orange-500 to-red-600",
      bgColor: mode === "dark" ? "from-orange-900/30 to-red-900/30" : "from-orange-50 to-red-50",
      borderColor: mode === "dark" ? "border-orange-800/50" : "border-orange-200/50"
    };
    if (streak >= 3) return { 
      level: "🌟 Building", 
      color: "from-green-500 to-emerald-600",
      bgColor: mode === "dark" ? "from-green-900/30 to-emerald-900/30" : "from-green-50 to-emerald-50",
      borderColor: mode === "dark" ? "border-green-800/50" : "border-green-200/50"
    };
    return { 
      level: "🌱 Starting", 
      color: "from-gray-500 to-gray-600",
      bgColor: mode === "dark" ? "from-gray-900/30 to-gray-800/30" : "from-gray-50 to-gray-100",
      borderColor: mode === "dark" ? "border-gray-700/50" : "border-gray-300/50"
    };
  };

  const streakInfo = getStreakLevel(data.streak);

  // Calculate completion percentage for next milestone
  const getNextMilestone = (streak: number) => {
    if (streak < 3) return { target: 3, percentage: (streak / 3) * 100 };
    if (streak < 7) return { target: 7, percentage: (streak / 7) * 100 };
    if (streak < 14) return { target: 14, percentage: (streak / 14) * 100 };
    if (streak < 30) return { target: 30, percentage: (streak / 30) * 100 };
    return { target: 50, percentage: (streak / 50) * 100 };
  };

  const milestone = getNextMilestone(data.streak);

  return (
    <div className={`max-w-lg mx-auto max-md:mt-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-3xl ${
        mode === "dark"
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/95 border-gray-200/50"
      }`}
    >
      {/* Header Section */}
      <div className={`p-6 rounded-t-3xl bg-gradient-to-br ${streakInfo.bgColor} border-b ${streakInfo.borderColor}`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${streakInfo.color} mb-4 shadow-lg`}>
            <span className="text-2xl">📅</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Habit Tracker
          </h2>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${streakInfo.color} text-white shadow-md`}>
            {streakInfo.level}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Streak Counter */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${streakInfo.color} mb-4 shadow-lg animate-pulse`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.streak}</div>
              <div className="text-xs text-white/80">DAYS</div>
            </div>
          </div>
          <h3 className={`text-xl font-bold mb-1 ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
            🔥 {data.streak} Day Streak
          </h3>
          <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            You've been active on <span className="font-semibold">{data.totalDays}</span> total days
          </p>
        </div>

        {/* Progress to Next Milestone */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Progress to {milestone.target} days
            </span>
            <span className={`text-sm font-bold ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {Math.round(milestone.percentage)}%
            </span>
          </div>
          <div className={`w-full bg-gray-200 rounded-full h-3 ${mode === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
            <div 
              className={`bg-gradient-to-r ${streakInfo.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm`}
              style={{ width: `${Math.min(milestone.percentage, 100)}%` }}
            >
              <div className="h-full w-full bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Activity Visualization */}
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 text-center ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Last 14 Days Activity
          </h4>
          <div className="grid grid-cols-7 gap-2 justify-items-center">
            {streakArray.reverse().map((isActive, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isActive
                      ? `bg-gradient-to-br ${streakInfo.color} shadow-md`
                      : mode === "dark"
                        ? "bg-gray-700/50 border-2 border-gray-600/50"
                        : "bg-gray-100 border-2 border-gray-300/50"
                  }`}
                  title={`Day ${maxDisplayDays - index}: ${isActive ? 'Active' : 'Inactive'}`}
                >
                  {isActive && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs mt-1 ${mode === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {maxDisplayDays - index}d
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-xl text-center border transition-all duration-200 hover:scale-105 ${
            mode === "dark"
              ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50"
          }`}>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {data.streak}
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Current Streak
            </div>
          </div>
          
          <div className={`p-4 rounded-xl text-center border transition-all duration-200 hover:scale-105 ${
            mode === "dark"
              ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/30"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50"
          }`}>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {data.totalDays}
            </div>
            <div className={`text-xs font-medium ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Total Active Days
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className={`p-4 rounded-xl text-center border-l-4 ${
          data.streak >= 7
            ? mode === "dark"
              ? "bg-green-900/20 border-green-500 text-green-200"
              : "bg-green-50 border-green-500 text-green-800"
            : data.streak >= 3
              ? mode === "dark"
                ? "bg-yellow-900/20 border-yellow-500 text-yellow-200"
                : "bg-yellow-50 border-yellow-500 text-yellow-800"
              : mode === "dark"
                ? "bg-blue-900/20 border-blue-500 text-blue-200"
                : "bg-blue-50 border-blue-500 text-blue-800"
        }`}>
          <div className="text-sm font-medium">
            {data.streak >= 30 ? "🏆 Incredible! You're a journaling legend!" :
             data.streak >= 14 ? "⭐ Amazing consistency! You're mastering the habit!" :
             data.streak >= 7 ? "🔥 You're on fire! Keep this momentum going!" :
             data.streak >= 3 ? "🌟 Great start! You're building something special!" :
             data.streak >= 1 ? "🌱 Every journey begins with a single step!" :
             "💪 Ready to start your wellness journey?"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;