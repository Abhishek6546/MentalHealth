import BreathingExercise from '../components/BreathingExercise';
import MeditationAudio from '../components/MeditationAudio';
import { useTheme } from '../context/ThemeContext';

function Practice() {
  const { mode } = useTheme();

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300 ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800'
      }`}
    >
      {/* Background decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          mode === 'dark' ? 'bg-blue-700' : 'bg-blue-200'
        }`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 ${
          mode === 'dark' ? 'bg-purple-700' : 'bg-purple-200'
        }`}></div>
        <div className={`absolute -bottom-32 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000 ${
          mode === 'dark' ? 'bg-pink-700' : 'bg-pink-200'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-5xl font-bold bg-clip-text text-transparent mb-4 ${
              mode === 'dark'
                ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            }`}
          >
            Practice & Meditation
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Take a moment to breathe, relax, and center yourself with our guided exercises and soothing music
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <BreathingExercise />
          <MeditationAudio />
        </div>
      </div>
    </div>
  );
}

export default Practice;
