import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";

const JournalForm = () => {
  const [thought, setThought] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [entryCount, setEntryCount] = useState(0); // 🔴 new state
  const { token } = useAuth();
  const { mode } = useTheme();

  const MAX_ENTRIES = 10;

  useEffect(() => {
    const fetchEntryCount = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:500";
      const res = await fetch(`${apiUrl}api/journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEntryCount(data.length);
    };

    fetchEntryCount();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (entryCount >= MAX_ENTRIES) return;

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:500";

    try {
      const res = await fetch(`${apiUrl}api/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thought, mood }),
      });

      const data = await res.json();

      if (res.ok) {
        setAiReply(data.aiReply || "AI could not respond.");
        setThought("");
        setEntryCount((prev) => prev + 1); // 🔴 update entry count
      } else {
        setAiReply(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.log("Something went wrong.",err);
    } finally {
      setLoading(false);
    }
  };

  const entriesLeft = MAX_ENTRIES - entryCount;
  const limitReached = entryCount >= MAX_ENTRIES;

  return (
    <div className={`max-w-xl mx-auto p-4 rounded shadow transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#1e1232]"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">Write Your Thought</h2>

      {/* Entry Count Message */}
      <p className={`text-sm mb-3 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        {limitReached
          ? "You have reached the 10 journal entry limit."
          : `Entries left: ${entriesLeft}/10`}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
           className={`w-full p-2 rounded mb-3 resize-none transition ${
            mode === "dark"
              ? "bg-gray-700 text-white border border-gray-600 placeholder-gray-400"
              : "bg-white text-black border border-gray-300"
          }`}
          rows={5}
          placeholder="What's on your mind?"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          required
          disabled={limitReached}
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          disabled={limitReached}
           className={`w-full p-2 rounded mb-3 transition ${
            mode === "dark"
              ? "bg-gray-700 text-white border border-gray-600"
              : "bg-white text-black border border-gray-300"
          }`}
        >
          <option>Happy</option>
          <option>Sad</option>
          <option>Anxious</option>
          <option>Angry</option>
          <option>Neutral</option>
        </select>
        <button
          type="submit"
          disabled={loading || limitReached}
         className={`px-4 py-2 rounded text-white font-medium transition ${
            loading || limitReached
              ? "bg-gray-400 cursor-not-allowed"
              : mode === "dark"
              ? "bg-yellow-400 text-[#1e1232] hover:bg-yellow-300"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {aiReply && (
        <div
        className={`mt-4 p-3 rounded border transition ${
            mode === "dark"
              ? "bg-green-900 text-green-200 border-green-700"
              : "bg-green-100 text-green-700 border-green-300"
          }`}
        >
          <p className="font-semibold text-green-700">AI says:</p>
          <p className="text-gray-800 mt-1 whitespace-pre-line">{aiReply}</p>
        </div>
      )}
    </div>
  );
};

export default JournalForm;
