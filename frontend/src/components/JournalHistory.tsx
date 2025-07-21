import {  useEffect, useState} from "react";
import { fetchJournal } from "../services/api";
import { useAuth } from "../context/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";


interface JournalEntry {
  _id: string;
  thought: string;
  mood: string;
  aiReply?: string;
  date: string;
}

type TokenPayload = {
  id: string; // or _id, depending on how you signed your token
};

const JournalHistory = () => {
  const { token } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const navigate = useNavigate();
  const { mode } = useTheme();

  useEffect(() => {
   
    if (!token) {
      navigate("/login");
    }

    const getData = async () => {
     
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("Decoded token:", decoded);
        const data = await fetchJournal(token);
        setEntries(data);
      }
    };
    getData();
  }, [navigate, token]);

  return (
    <div className={`p-4 transition-colors duration-300 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-[#1e1232]"}`}>
      {entries.map((entry: JournalEntry) => (
        <div  key={entry._id}
          className={`mb-4 p-4 border rounded shadow-sm transition ${
            mode === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <p className="mb-2">{entry.thought}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mood: {entry.mood} | {new Date(entry.date).toLocaleString()}
            {entry.aiReply && (
              <div className={`mt-3 p-3 rounded border transition ${
                mode === "dark"
                  ? "bg-green-900 border-green-700 text-green-300"
                  : "bg-green-100 border-green-300 text-green-700"
              }`}
            >
                <p className="text-green-700 font-semibold">AI says:</p>
                <p className="text-gray-800 mt-1 whitespace-pre-line">{entry.aiReply}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    
    </div>
  );
};

export default JournalHistory;
