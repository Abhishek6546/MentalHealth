import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const JournalForm = () => {
  const [thought, setThought] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [entryCount, setEntryCount] = useState(0); // 🔴 new state
  const { token } = useAuth();

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
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Write Your Thought</h2>

      {/* Entry Count Message */}
      <p className="text-sm text-gray-600 mb-3">
        {limitReached
          ? "You have reached the 10 journal entry limit."
          : `Entries left: ${entriesLeft}/10`}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-3"
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
          className="w-full p-2 border border-gray-300 rounded mb-3"
          disabled={limitReached}
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
          className={`px-4 py-2 rounded text-white ${
            loading || limitReached
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {aiReply && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          <p className="font-semibold text-green-700">AI says:</p>
          <p className="text-gray-800 mt-1 whitespace-pre-line">{aiReply}</p>
        </div>
      )}
    </div>
  );
};

export default JournalForm;
