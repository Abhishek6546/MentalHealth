
import BreathingExercise from '../components/BreathingExercise'
import MeditationAudio from '../components/MeditationAudio'
import { useTheme } from '../context/ThemeContext';

function Practice() {
  const { mode } = useTheme();
  return (
    <div
     className={`min-h-screen transition-colors duration-300 ${
        mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-[#1e1232]'
      }`}
    >
      <BreathingExercise/>
      <MeditationAudio/>
    </div>
  )
}

export default Practice
