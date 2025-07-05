import { useState } from "react";
import { useAuth } from "../context/useAuth";

const JournalForm = () => {
  const [thought, setThought] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [aiReply, setAiReply] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Save journal entry
    await fetch("http://localhost:5000/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ thought, mood }),
    });

    // Step 2: Get AI response
    const aiRes = await fetch("http://localhost:5000/api/ai/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thought }),
    });
  
    const data = await aiRes.json();
  
    setAiReply(data.reply || "AI could not respond at the moment.");

    setThought("");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Write Your Thought</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-3"
          rows={5}
          placeholder="What's on your mind?"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          required
        />
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        >
          <option>Happy</option>
          <option>Sad</option>
          <option>Anxious</option>
          <option>Angry</option>
          <option>Neutral</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
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
