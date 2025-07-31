import { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState("all");
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

  // Filter entries based on search and mood
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.thought.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  // Get unique moods for filter
  const uniqueMoods = [...new Set(entries.map(entry => entry.mood))];

  // Mood emojis mapping
  const moodEmojis: { [key: string]: string } = {
    "Happy": "😊",
    "Sad": "😢",
    "Anxious": "😰",
    "Excited": "🤩",
    "Calm": "😌",
    "Angry": "😠",
    "Grateful": "🙏",
    "Confused": "😕",
    "Loved": "🥰",
    "Tired": "😴"
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        mode === "dark" 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-[#1e1232]"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          mode === "dark" ? "bg-purple-600" : "bg-purple-300"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          mode === "dark" ? "bg-blue-600" : "bg-blue-300"
        }`} style={{ animationDelay: "2s" }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl opacity-10 animate-pulse ${
          mode === "dark" ? "bg-pink-600" : "bg-pink-300"
        }`} style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 lg:px-8">
        <div className="max-w-6xl mx-auto">
          

           <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                mode === "dark"
                  ? "bg-gray-800/60 border border-gray-700 text-gray-300 hover:bg-gray-700/60"
                  : "bg-white/60 border border-gray-200 text-gray-600 hover:bg-white/80"
              }`}
            >
              <span className="mr-2">←</span>
              Back to Dashboard
            </button>
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
           

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 mb-6 shadow-2xl animate-bounce">
              <span className="text-3xl">📖</span>
            </div>
            
            <h1 className={`text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient-x`}>
              Your Journal History
            </h1>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              mode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Explore your thoughts, emotions, and growth over time
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
              <div className={`p-6 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                mode === "dark" 
                  ? "bg-gray-800/90 border-gray-700/50 shadow-2xl" 
                  : "bg-white/95 border-gray-200/50 shadow-xl"
              }`}>
                <div className="text-3xl mb-2">📝</div>
                <div className="text-2xl font-bold">{entries.length}</div>
                <div className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Total Entries
                </div>
              </div>

              <div className={`p-6 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                mode === "dark" 
                  ? "bg-gray-800/90 border-gray-700/50 shadow-2xl" 
                  : "bg-white/95 border-gray-200/50 shadow-xl"
              }`}>
                <div className="text-3xl mb-2">🎭</div>
                <div className="text-2xl font-bold">{uniqueMoods.length}</div>
                <div className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Different Moods
                </div>
              </div>

              <div className={`p-6 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                mode === "dark" 
                  ? "bg-gray-800/90 border-gray-700/50 shadow-2xl" 
                  : "bg-white/95 border-gray-200/50 shadow-xl"
              }`}>
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-2xl font-bold">{entries.filter(e => e.aiReply).length}</div>
                <div className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  AI Responses
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className={`p-6 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
              mode === "dark" 
                ? "bg-gray-800/90 border-gray-700/50 shadow-2xl" 
                : "bg-white/95 border-gray-200/50 shadow-xl"
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-xl">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search your thoughts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      mode === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500"
                    }`}
                  />
                </div>

                {/* Mood Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-xl">🎭</span>
                  </div>
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none ${
                      mode === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-800"
                    }`}
                  >
                    <option value="all">All Moods</option>
                    {uniqueMoods.map(mood => (
                      <option key={mood} value={mood}>
                        {moodEmojis[mood] || "😊"} {mood}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Counter */}
              <div className="mt-4 text-center">
                <span className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Showing {filteredEntries.length} of {entries.length} entries
                </span>
              </div>
            </div>
          </div>

          {/* Journal Entries */}
          <div className="space-y-6">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className={`text-2xl font-bold mb-2 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  No entries found
                </h3>
                <p className={`text-lg ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {searchTerm || selectedMood !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Start your journaling journey today!"
                  }
                </p>
              </div>
            ) : (
              filteredEntries.map((entry: JournalEntry, index: number) => (
                <div
                  key={entry._id}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                      mode === "dark" ? "bg-purple-600" : "bg-purple-300"
                    }`}></div>
                    
                    {/* Entry Card */}
                    <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                      mode === "dark" 
                        ? "bg-gray-800/90 border-gray-700/50 shadow-2xl hover:shadow-purple-500/10" 
                        : "bg-white/95 border-gray-200/50 shadow-xl hover:shadow-purple-500/10"
                    }`}>
                      
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-xl">{moodEmojis[entry.mood] || "😊"}</span>
                          </div>
                          <div>
                            <div className={`font-semibold text-lg ${
                              mode === "dark" ? "text-purple-300" : "text-purple-700"
                            }`}>
                              {entry.mood}
                            </div>
                            <div className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`px-4 py-2 rounded-full text-xs font-medium ${
                          mode === "dark"
                            ? "bg-purple-900/30 text-purple-300 border border-purple-800/30"
                            : "bg-purple-100 text-purple-700 border border-purple-200"
                        }`}>
                          Entry #{entries.length - index}
                        </div>
                      </div>

                      {/* Thought Content */}
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 flex items-center ${
                          mode === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}>
                          <span className="mr-2">💭</span>
                          Your Thoughts
                        </h4>
                        <div className={`p-4 rounded-2xl border-l-4 border-purple-500 ${
                          mode === "dark"
                            ? "bg-gray-700/30 text-gray-200"
                            : "bg-purple-50/50 text-gray-800"
                        }`}>
                          <p className="text-lg leading-relaxed whitespace-pre-line">{entry.thought}</p>
                        </div>
                      </div>

                      {/* AI Reply */}
                      {entry.aiReply && (
                        <div className="relative">
                          <h4 className={`text-sm font-semibold mb-3 flex items-center ${
                            mode === "dark" ? "text-green-300" : "text-green-700"
                          }`}>
                            <span className="mr-2">🤖</span>
                            AI Insight
                          </h4>
                          <div className={`p-4 rounded-2xl border-l-4 border-green-500 ${
                            mode === "dark"
                              ? "bg-green-900/20 border-green-700 text-green-200"
                              : "bg-green-50 border-green-300 text-green-800"
                          }`}>
                            <p className="leading-relaxed whitespace-pre-line">{entry.aiReply}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Back to Top Button */}
          {filteredEntries.length > 5 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  mode === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/25"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25"
                }`}
              >
                <span className="mr-2">↑</span>
                Back to Top
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default JournalHistory;