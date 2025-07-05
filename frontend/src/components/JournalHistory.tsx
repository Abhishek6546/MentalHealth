import { useEffect, useState } from "react";
import { fetchJournal } from "../services/api";
import { useAuth } from "../context/useAuth";
type JournalEntry = {
  _id: string;
  thought: string;
  mood: string;
  date: string;
};

const JournalHistory = () => {


const { token } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const getData = async () => {
     
      const data = await fetchJournal(token || "");
      setEntries(data);
    };
    getData();
  }, [token]);

  return (
    <div>
      {entries.map((entry: JournalEntry) => (
        <div key={entry._id} className="mb-3 p-3 border rounded">
          <p className="text-gray-700">{entry.thought}</p>
          <div className="text-sm text-gray-500">
            Mood: {entry.mood} | {new Date(entry.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalHistory;
