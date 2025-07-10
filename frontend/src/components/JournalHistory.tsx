import { useEffect, useState } from "react";
import { fetchJournal } from "../services/api";
import { useAuth } from "../context/useAuth";
import MoodChart from "./MoodChart";
import { jwtDecode } from "jwt-decode";
import JournalExport from "./JournalExport";
import DarkModeToggle from "./DarkModeToggle";

type JournalEntry = {
  _id: string;
  thought: string;
  mood: string;
  date: string;
};

type TokenPayload = {
  id: string; // or _id, depending on how you signed your token
};

const JournalHistory = () => {
  const { token } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("Decoded token:", decoded);
        setUserId(decoded.id); // or decoded._id
        const data = await fetchJournal(token);
        setEntries(data);
      }
    };
    getData();
  }, [token]);

  return (
    <div className="">
      {entries.map((entry: JournalEntry) => (
        <div key={entry._id} className="mb-3 p-3 border rounded">
          <p className="text-gray-700">{entry.thought}</p>
          <div className="text-sm text-gray-500">
            Mood: {entry.mood} | {new Date(entry.date).toLocaleString()}
          </div>
        </div>
      ))}
      {userId && <MoodChart userId={userId} />}
      <JournalExport userId={userId} />
     <DarkModeToggle/>
    </div>
  );
};

export default JournalHistory;
