import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalForm";
import MoodChart from "../components/MoodChart";
import { useAuth } from "../context/useAuth";
import { jwtDecode } from "jwt-decode";
import JournalExport from "../components/JournalExport";
import HabitTracker from "../components/HabitTracker";
import { useTheme } from "../context/ThemeContext";

type TokenPayload = {
  id: string; // or _id, depending on how you signed your token
};

function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { mode } = useTheme();
  
  const [userId, setUserId] = useState<string>("");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const getData = async () => {
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("Decoded token:", decoded);
        setUserId(decoded.id); // or decoded._id
      }
    };
    getData();
  }, [token, navigate]);

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
          mode === "dark" ? "bg-blue-600" : "bg-blue-300"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
          mode === "dark" ? "bg-purple-600" : "bg-purple-300"
        }`} style={{ animationDelay: "2s" }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl opacity-10 animate-pulse ${
          mode === "dark" ? "bg-indigo-600" : "bg-indigo-300"
        }`} style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-6 shadow-2xl animate-bounce">
              <span className="text-3xl">🧠</span>
            </div>
            <h1 className={`text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x`}>
              Welcome to MindFree
            </h1>
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              mode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Your personal sanctuary for mental wellness, habit tracking, and emotional growth
            </p>
            <div className="mt-6 flex justify-center">
              <div className={`px-6 py-3 rounded-full border-2 border-dashed ${
                mode === "dark" 
                  ? "border-blue-400/30 bg-blue-900/20 text-blue-300" 
                  : "border-blue-400/50 bg-blue-100/50 text-blue-600"
              }`}>
                <span className="mr-2">✨</span>
                Track • Reflect • Grow
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="space-y-8">
            
            {/* First Row: Journal Form & Habit Tracker */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 min-h-[500px]">
              
              {/* Journal Form - Takes 2 columns */}
              <div className="xl:col-span-2">
                <div className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
                    mode === "dark" ? "bg-blue-600 opacity-30" : "bg-blue-300 opacity-10"
                  }`}></div>
                  <div className="relative h-full">
                    <JournalForm />
                  </div>
                </div>
              </div>

              {/* Habit Tracker - Takes 1 column */}
              <div className="xl:col-span-1">
                <div className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
                    mode === "dark" ? "bg-green-600 opacity-30" : "bg-green-300 opacity-10"
                  }`}></div>
                  <div className="relative h-full">
                    <HabitTracker />
                  </div>
                </div>
              </div>

            </div>

            {/* Second Row: Mood Chart & Export Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 min-h-[500px]">

                {/* Export Section - Takes 1 column */}
              <div className="xl:col-span-1">
                <div className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
                    mode === "dark" ? "bg-purple-600 opacity-30" : "bg-purple-300 opacity-10"
                  }`}></div>
                  <div className="relative h-full">
                    <JournalExport userId={userId} />
                  </div>
                </div>
              </div>

              {/* Mood Chart - Takes 2 columns */}
              <div className="xl:col-span-2">
                <div className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
                    mode === "dark" ? "bg-pink-600 opacity-30" : "bg-pink-300 opacity-10"
                  }`}></div>
                  <div className="relative h-full">
                    {userId && <MoodChart userId={userId} />}
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row: Quick Actions Panel - Full Width */}
            <div className="min-h-[300px]">
              <div className="group relative h-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
                  mode === "dark" ? "bg-yellow-600 opacity-30" : "bg-yellow-300 opacity-10"
                }`}></div>
                <div className="relative h-full">
                  <div className={`h-full p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
                    mode === "dark" 
                      ? "bg-gray-800/90 border-gray-700/50 shadow-2xl" 
                      : "bg-white/95 border-gray-200/50 shadow-xl"
                  }`}>
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-4 shadow-lg">
                        <span className="text-xl">⚡</span>
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        Quick Actions
                      </h3>
                      <p className={`text-sm mt-2 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Fast access to your journey
                      </p>
                    </div>

                    {/* Action Buttons - Horizontal Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* View History Button */}
                      <button
                        onClick={() => navigate("/journal-history")}
                        className={`p-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg ${
                          mode === "dark"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-yellow-400/25"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-blue-500/25"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-2xl mb-2">📖</span>
                          <div className="font-bold">View History</div>
                          <div className="text-sm opacity-80">Browse past entries</div>
                        </div>
                      </button>

                      {/* Wellness Tips */}
                      <div className={`p-4 rounded-2xl border-2 border-dashed transition-all duration-300 hover:border-solid ${
                        mode === "dark"
                          ? "border-green-400/30 bg-green-900/20 hover:bg-green-900/30"
                          : "border-green-400/50 bg-green-50/50 hover:bg-green-100/50"
                      }`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">🌱</div>
                          <div className={`text-sm font-semibold ${
                            mode === "dark" ? "text-green-300" : "text-green-700"
                          }`}>
                            Daily Wellness Tip
                          </div>
                          <div className={`text-xs mt-2 ${
                            mode === "dark" ? "text-green-400" : "text-green-600"
                          }`}>
                            "Take 5 deep breaths and notice how you feel right now"
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className={`p-4 rounded-2xl ${
                        mode === "dark"
                          ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/30"
                          : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50"
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-sm font-semibold ${
                            mode === "dark" ? "text-purple-300" : "text-purple-700"
                          }`}>
                            Today's Progress
                          </span>
                          <span className="text-xl">🎯</span>
                        </div>
                        <div className={`w-full bg-gray-200 rounded-full h-2 ${
                          mode === "dark" ? "bg-gray-700" : "bg-gray-200"
                        }`}>
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                        </div>
                        <div className={`text-xs mt-2 text-center ${
                          mode === "dark" ? "text-purple-400" : "text-purple-600"
                        }`}>
                          Great job! Keep it up! 🌟
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Encouragement */}
          <div className="mt-16 text-center">
            <div className={`inline-flex items-center px-8 py-4 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
              mode === "dark"
                ? "border-blue-400/30 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40"
                : "border-blue-400/50 bg-blue-100/50 text-blue-600 hover:bg-blue-200/50"
            }`}>
              <span className="text-2xl mr-3">🚀</span>
              <div className="text-left">
                <div className="font-bold">You're doing amazing!</div>
                <div className="text-sm opacity-80">Every step counts in your wellness journey</div>
              </div>
            </div>
          </div>

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
}

export default Dashboard;