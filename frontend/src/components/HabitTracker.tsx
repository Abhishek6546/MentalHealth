import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

interface StreakData {
  totalDays: number;
  streak: number;
}

const HabitTracker = () => {
  const [data, setData] = useState<StreakData | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStreak = async () => {
      const res = await fetch("http://localhost:5000/api/journal/streak", {
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
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-6 text-center">
      <h2 className="text-xl font-bold mb-2">📅 Habit Tracker</h2>
      <p className="text-lg">
        🔥 <strong>{data.streak}</strong> day streak
      </p>
      <p className="text-sm text-gray-500">
        You’ve been active on <strong>{data.totalDays}</strong> days.
      </p>
    </div>
  );
};

export default HabitTracker;
