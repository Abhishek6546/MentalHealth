import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export interface UserType {
  name?: string;
  email: string;
  // add more fields if your backend returns them
}

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const { mode } = useTheme();
  const [entryCount, setEntryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCount = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";
      const res = await fetch(`${apiUrl}api/journal`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEntryCount(data.length);
    };
    fetchCount();
  }, [token, navigate]);

  // Get user initials for avatar
  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  // Calculate activity level based on entry count
  const getActivityLevel = (count: number) => {
    if (count >= 50) return { level: "Expert", color: "from-purple-500 to-pink-600", emoji: "🏆" };
    if (count >= 20) return { level: "Advanced", color: "from-blue-500 to-cyan-600", emoji: "⭐" };
    if (count >= 10) return { level: "Active", color: "from-green-500 to-emerald-600", emoji: "🌟" };
    if (count >= 5) return { level: "Growing", color: "from-yellow-500 to-orange-600", emoji: "🌱" };
    return { level: "Beginner", color: "from-gray-500 to-gray-600", emoji: "🌿" };
  };

  const activityInfo = getActivityLevel(entryCount);

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-[#1e1232]"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Main Profile Card */}
        <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
          mode === "dark"
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/95 border-gray-200/50"
        }`}>
          
          {/* Profile Header */}
          <div className="text-center mb-8">
            {/* Avatar */}
            <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 bg-gradient-to-br ${activityInfo.color} shadow-lg`}>
              <span className="text-3xl font-bold text-white">
                {user?.email ? getUserInitials(user.email) : "U"}
              </span>
              {/* Activity Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">{activityInfo.emoji}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Welcome to your wellness dashboard
            </p>
          </div>

          {/* Profile Information Grid */}
          <div className="grid gap-6 mb-8">
            {/* Email Section */}
            <div className={`p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              mode === "dark"
                ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30"
                : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50"
            }`}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white text-lg">📧</span>
                </div>
                <h3 className="text-lg font-semibold">Email Address</h3>
              </div>
              <p className={`text-lg font-medium ${
                mode === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
                {user?.email || "Not available"}
              </p>
            </div>

            {/* Journal Stats Section */}
            <div className={`p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              mode === "dark"
                ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/30"
                : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold">Journal Entries</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${activityInfo.color} text-white`}>
                  {activityInfo.level}
                </div>
              </div>
              
              <div className="flex items-end space-x-4">
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {entryCount}
                  </p>
                  <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Total Entries
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="flex-1 mb-2">
                  <div className={`w-full bg-gray-200 rounded-full h-2 ${
                    mode === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    <div 
                      className={`bg-gradient-to-r ${activityInfo.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min((entryCount / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 text-right ${
                    mode === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {Math.min((entryCount / 50) * 100, 100).toFixed(0)}% to Expert
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Section */}
            <div className={`p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] ${
              mode === "dark"
                ? "bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800/30"
                : "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200/50"
            }`}>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <h3 className="text-lg font-semibold">Wellness Level</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xl font-bold ${
                    mode === "dark" ? "text-yellow-300" : "text-yellow-700"
                  }`}>
                    {activityInfo.level} Writer
                  </p>
                  <p className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Keep journaling to level up!
                  </p>
                </div>
                <div className="text-3xl">
                  {activityInfo.emoji}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className={`p-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                mode === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
              }`}
            >
              <span className="mr-2">📊</span>
              Dashboard
            </button>
            
            <button
              onClick={() => navigate("/journal-history")}
              className={`p-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                mode === "dark"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
              }`}
            >
              <span className="mr-2">📖</span>
              History
            </button>
          </div>

          {/* Logout Section */}
          <div className={`p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            mode === "dark"
              ? "border-red-800/30 bg-red-900/10 hover:border-red-600/50 hover:bg-red-900/20"
              : "border-red-200/50 bg-red-50/50 hover:border-red-300/50 hover:bg-red-100/50"
          }`}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mb-4">
                <span className="text-white text-lg">🚪</span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                mode === "dark" ? "text-red-300" : "text-red-700"
              }`}>
                Ready to sign out?
              </h3>
              <p className={`text-sm mb-4 ${
                mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                You can always come back to continue your wellness journey
              </p>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:from-red-600 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <span className="mr-2">👋</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className={`mt-6 p-6 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
          mode === "dark"
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white/50 border-gray-200/50"
        }`}>
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-2 ${
              mode === "dark" ? "text-gray-200" : "text-gray-800"
            }`}>
              🌟 Your Wellness Journey
            </h3>
            <p className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Every entry is a step towards better mental health. Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;