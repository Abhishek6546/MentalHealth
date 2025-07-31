import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";

const JournalForm = () => {
  const [thought, setThought] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
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
        setEntryCount((prev) => prev + 1);
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

  // Mood emoji mapping - removed unused variable

  return (
    <div className={`p-8 rounded-3xl backdrop-blur-md border transition-all duration-500 h-full ${
        mode === "dark" 
          ? "bg-gray-800/95 text-white border-gray-700/50 shadow-2xl" 
          : "bg-white/98 text-[#1e1232] border-gray-200/60 shadow-xl"
      }`}
    >
      {/* Floating Header Section */}
      <div className="text-center mb-8 relative">
        {/* Animated background circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full animate-pulse blur-xl"></div>
        
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
          <span className="text-3xl animate-bounce">✍️</span>
        </div>
        
        <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Write Your Thought
        </h2>
        
        {/* Enhanced Progress Bar */}
        <div className="relative w-full max-w-md mx-auto mb-4">
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            mode === "dark" ? "bg-gray-700/50" : "bg-gray-200/80"
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${(entryCount / MAX_ENTRIES) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className={mode === "dark" ? "text-gray-400" : "text-gray-500"}>0</span>
            <span className={mode === "dark" ? "text-gray-400" : "text-gray-500"}>{MAX_ENTRIES}</span>
          </div>
        </div>
        
        {/* Enhanced Entry Count Message */}
        <div className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
          limitReached
            ? mode === "dark" 
              ? "bg-gradient-to-r from-red-900/30 to-pink-900/30 text-red-300 border-2 border-red-800/50" 
              : "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-2 border-red-200/80"
            : mode === "dark"
              ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 border-2 border-blue-800/50"
              : "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-2 border-blue-200/80"
        }`}>
          {limitReached ? (
            <>
              <span className="mr-3 text-lg animate-pulse">🚫</span>
              <div className="text-center">
                <div className="font-bold">Limit Reached!</div>
                <div className="text-xs opacity-80">You've completed your daily entries</div>
              </div>
            </>
          ) : (
            <>
              <span className="mr-3 text-lg animate-bounce">📝</span>
              <div className="text-center">
                <div className="font-bold">{entriesLeft} Entries Left</div>
                <div className="text-xs opacity-80">Keep sharing your thoughts</div>
              </div>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Enhanced Textarea */}
        <div className="space-y-3">
          <label className={`flex items-center text-base font-bold ${
            mode === "dark" ? "text-gray-200" : "text-gray-800"
          }`}>
            <span className="mr-3 text-xl">💭</span>
            Share what's on your mind
          </label>
          <div className="relative group">
            <textarea
              className={`w-full p-6 rounded-2xl resize-none transition-all duration-300 focus:ring-4 focus:ring-offset-0 placeholder:text-lg ${
                mode === "dark"
                  ? "bg-gray-700/80 text-white border-2 border-gray-600/50 placeholder-gray-400 focus:ring-blue-500/30 focus:border-blue-400/80 hover:bg-gray-700/90"
                  : "bg-gray-50/80 text-black border-2 border-gray-300/50 placeholder-gray-500 focus:ring-blue-500/30 focus:border-blue-400/80 hover:bg-gray-100/80"
              } ${limitReached ? "opacity-50 cursor-not-allowed" : "group-hover:shadow-lg"}`}
              rows={6}
              placeholder="What's on your mind? Share your thoughts, feelings, or experiences..."
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              required
              disabled={limitReached}
            />
            {/* Character counter with emoji */}
            <div className={`absolute bottom-4 right-4 flex items-center px-3 py-1 rounded-xl text-sm ${
              mode === "dark" 
                ? "bg-gray-800/80 text-gray-400" 
                : "bg-white/80 text-gray-500"
            }`}>
              <span className="mr-2">📊</span>
              {thought.length} characters
            </div>
          </div>
        </div>

        {/* Enhanced Mood Selector */}
        <div className="space-y-3">
          <label className={`flex items-center text-base font-bold ${
            mode === "dark" ? "text-gray-200" : "text-gray-800"
          }`}>
            <span className="mr-3 text-xl">🎭</span>
            How are you feeling?
          </label>
          <div className="relative group">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              disabled={limitReached}
              className={`w-full p-5 pr-12 rounded-2xl appearance-none transition-all duration-300 focus:ring-4 focus:ring-offset-0 text-lg font-semibold ${
                mode === "dark"
                  ? "bg-gray-700/80 text-white border-2 border-gray-600/50 focus:ring-blue-500/30 focus:border-blue-400/80 hover:bg-gray-700/90"
                  : "bg-gray-50/80 text-black border-2 border-gray-300/50 focus:ring-blue-500/30 focus:border-blue-400/80 hover:bg-gray-100/80"
              } ${limitReached ? "opacity-50 cursor-not-allowed" : "cursor-pointer group-hover:shadow-lg"}`}
            >
              <option value="Happy">😊 Happy - Feeling great and positive!</option>
              <option value="Sad">😢 Sad - Going through a tough time</option>
              <option value="Anxious">😰 Anxious - Feeling worried or stressed</option>
              <option value="Angry">😠 Angry - Frustrated or upset</option>
              <option value="Neutral">😐 Neutral - Just an ordinary day</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                mode === "dark" ? "bg-gray-600/50" : "bg-gray-300/50"
              }`}>
                <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Submit Button */}
        <button
          type="submit"
          disabled={loading || limitReached}
          className={`w-full py-5 px-8 rounded-2xl font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden ${
            loading || limitReached
              ? "bg-gray-400 cursor-not-allowed text-white"
              : mode === "dark"
              ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-gray-900 hover:shadow-2xl hover:shadow-yellow-400/25 shadow-lg"
              : "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 shadow-lg"
          }`}
        >
          {/* Button background animation */}
          {!loading && !limitReached && (
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
          )}
          
          <div className="relative flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing your thoughts...</span>
              </>
            ) : (
              <>
                <span className="mr-4 text-2xl animate-pulse">✨</span>
                <div className="text-center">
                  <div>Submit Entry</div>
                  <div className="text-sm opacity-80 font-normal">Let AI help you reflect</div>
                </div>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Enhanced AI Reply */}
      {aiReply && (
        <div className={`mt-8 p-6 rounded-2xl border-l-4 transition-all duration-700 transform hover:scale-[1.02] ${
            mode === "dark"
              ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 text-green-100 border-green-400 border border-green-800/50 shadow-lg shadow-green-900/20"
              : "bg-gradient-to-br from-green-50 to-emerald-50 text-green-900 border-green-500 border border-green-200/50 shadow-lg shadow-green-500/10"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                mode === "dark" 
                  ? "bg-gradient-to-br from-green-600 to-emerald-600" 
                  : "bg-gradient-to-br from-green-400 to-emerald-500"
              }`}>
                <span className="text-xl">🤖</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <p className={`font-black text-lg ${
                  mode === "dark" ? "text-green-300" : "text-green-700"
                }`}>
                  AI Reflection
                </p>
                <div className="ml-3 flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              <p className={`leading-relaxed whitespace-pre-line text-base ${
                mode === "dark" ? "text-green-50" : "text-green-800"
              }`}>
                {aiReply}
              </p>
              
              {/* Reaction buttons */}
              <div className="flex items-center mt-4 space-x-3">
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                  mode === "dark"
                    ? "bg-green-800/50 text-green-200 hover:bg-green-700/50"
                    : "bg-green-200/50 text-green-700 hover:bg-green-300/50"
                }`}>
                  👍 Helpful
                </button>
                <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                  mode === "dark"
                    ? "bg-green-800/50 text-green-200 hover:bg-green-700/50"
                    : "bg-green-200/50 text-green-700 hover:bg-green-300/50"
                }`}>
                  💡 Insightful
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalForm