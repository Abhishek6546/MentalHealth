import { useTheme } from "../context/ThemeContext";

const ResourcesPage = () => {
  const { mode } = useTheme();
  const quotes = [
    "You don't have to control your thoughts. You just have to stop letting them control you. – Dan Millman",
    "The greatest weapon against stress is our ability to choose one thought over another. – William James",
    "This too shall pass.",
    "You are not alone. You are enough.",
  ];

  const tips = [
    "🌿 Practice deep breathing for 1 minute every morning.",
    "🧠 Write down 3 things you're grateful for each day.",
    "📵 Take 10 minutes away from your phone before bed.",
    "☀️ Get sunlight for at least 15 minutes a day.",
  ];

  const videos = [
    {
      title: "5-Minute Guided Meditation",
      url: "https://www.youtube.com/embed/inpok4MKVLM",
    },
    {
      title: "Box Breathing Technique",
      url: "https://www.youtube.com/embed/FJJazKtH_9I",
    },
  ];

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-[#1e1232]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className={`text-center mb-12 p-8 rounded-3xl backdrop-blur-sm border ${
          mode === "dark" 
            ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-800/30" 
            : "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50"
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 mb-6 animate-pulse">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Self-Help Resources
          </h1>
          <p className={`text-lg ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Discover tools and inspiration for your mental wellness journey
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Motivational Quotes Section */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
              mode === "dark"
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/95 border-gray-200/50"
            }`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mr-4">
                  <span className="text-xl">🌟</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Motivational Quotes
                </h2>
              </div>
              
              <div className="grid gap-4">
                {quotes.map((quote, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border-l-4 transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                      mode === "dark"
                        ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500 hover:from-yellow-900/30 hover:to-orange-900/30"
                        : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-500 hover:from-yellow-100 hover:to-orange-100"
                    }`}
                  >
                    <p className={`italic leading-relaxed ${
                      mode === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}>
                      "{quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tips Section */}
          <div>
            <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
              mode === "dark"
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/95 border-gray-200/50"
            }`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-4">
                  <span className="text-xl">💡</span>
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Daily Tips
                </h2>
              </div>
              
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${
                      mode === "dark"
                        ? "bg-green-900/20 hover:bg-green-900/30 border border-green-800/30"
                        : "bg-green-50 hover:bg-green-100 border border-green-200/50"
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      mode === "dark" ? "text-green-200" : "text-green-800"
                    }`}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Action Button */}
              <div className="mt-6 pt-6 border-t border-gray-200/20">
                <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                  mode === "dark"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                }`}>
                  <span className="mr-2">✨</span>
                  Start Your Day Right
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className={`mt-8 p-8 rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 ${
          mode === "dark"
            ? "bg-gray-800/90 border-gray-700/50"
            : "bg-white/95 border-gray-200/50"
        }`}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mr-4">
              <span className="text-xl">🎥</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Guided Videos
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((vid, index) => (
              <div 
                key={index} 
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  mode === "dark"
                    ? "bg-gray-700/50 border border-gray-600/50"
                    : "bg-gray-50 border border-gray-200/50"
                }`}
              >
                <div className={`p-4 border-b ${
                  mode === "dark" ? "border-gray-600/50" : "border-gray-200/50"
                }`}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mr-3">
                      <span className="text-sm">▶️</span>
                    </div>
                    <h3 className={`font-semibold ${
                      mode === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      {vid.title}
                    </h3>
                  </div>
                </div>
                
                <div className="relative">
                  <iframe
                    className="w-full h-64 transition-all duration-300 group-hover:scale-105"
                    src={vid.url}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Overlay for better interaction */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none"></div>
                </div>
                
                <div className={`p-4 ${
                  mode === "dark" ? "bg-gray-700/30" : "bg-gray-100/50"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      mode === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Wellness Content
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className={`text-xs ${
                        mode === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Recommended
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className={`mt-8 p-6 rounded-xl border-2 border-dashed transition-all duration-300 hover:border-solid ${
            mode === "dark"
              ? "border-gray-600/50 bg-gray-700/20 hover:border-blue-500/50"
              : "border-gray-300/50 bg-gray-50/50 hover:border-blue-500/50"
          }`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-2xl">🌈</span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                mode === "dark" ? "text-white" : "text-gray-800"
              }`}>
                More Resources Coming Soon
              </h3>
              <p className={`text-sm ${
                mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                We're constantly adding new content to support your wellness journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;