import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const MoodChart = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<{ date: string; moodScore: number }[]>([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const res = await fetch(`http://localhost:5000/api/journal/moods/${userId}`);
      const raw = await res.json();

      const processed = raw.map((entry: MoodEntry) => ({
        date: entry.date,
        moodScore: moodScale[entry.mood] || 3,
      }));

      setData(processed);
    };

    fetchMoods();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow max-w-3xl mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4">Your Mood Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} tickFormatter={(v) => {
            return Object.keys(moodScale).find((k) => moodScale[k] === v) || "";
          }} />
          <Tooltip />
          <Line type="monotone" dataKey="moodScore" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
