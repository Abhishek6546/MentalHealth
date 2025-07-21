import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";

interface StreakData {
  totalDays: number;
  streak: number;
}

const HabitTracker = () => {
  const [data, setData] = useState<StreakData | null>(null);
  const { token } = useAuth();
  const { mode } = useTheme();

  useEffect(() => {
    const fetchStreak = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

      const res = await fetch(`${apiUrl}api/journal/streak`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      const result = await res.json();
      setData(result);
    };

    fetchStreak();
  }, [token]);

  if (!data) return null;

  return (
    <div  className={`max-w-md mx-auto p-4 mt-6 text-center rounded shadow transition-colors duration-300 ${
        mode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#1e1232]"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">📅 Habit Tracker</h2>
      <p className="text-lg">
        🔥 <strong>{data.streak}</strong> day streak
      </p>
      <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        You’ve been active on <strong>{data.totalDays}</strong> days.
      </p>
    </div>
  );
};

export default HabitTracker;
