// src/components/BreathingExercise.tsx
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // make sure this is correct

const phases = [
  { label: "Breathe In", duration: 4000, instruction: "Inhale slowly and deeply" },
  { label: "Hold", duration: 3000, instruction: "Hold your breath gently" },
  { label: "Breathe Out", duration: 4000, instruction: "Exhale completely" },
  { label: "Hold", duration: 3000, instruction: "Pause before next breath" },
];

const TOTAL_SESSION_MS = 60000; // 1 minute

const BreathingExercise = () => {
  const { mode } = useTheme(); // light or dark
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentPhase = phases[phaseIndex];
  const timeLeft = Math.floor((TOTAL_SESSION_MS - elapsed) / 1000);

  // Phase progress logic
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (currentPhase.duration / 100));
          if (newProgress >= 100) {
            setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
            setElapsed((prev) => prev + currentPhase.duration);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isActive, phaseIndex, currentPhase.duration]);

  // End session after total time
  useEffect(() => {
    if (elapsed >= TOTAL_SESSION_MS && isActive) {
      setIsActive(false);
      setElapsed(0);
      setProgress(0);
      audioRef.current?.pause();
    }
  }, [elapsed, isActive]);

  return (
    <div
      className={`rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border mx-4 sm:mx-0
        ${mode === "dark" 
          ? "bg-gray-900 text-white border-gray-700" 
          : "bg-white text-gray-800 border-gray-100"}`}
    >
      {/* Hidden Audio */}
      <audio ref={audioRef} src="/sounds/breathe.mp3" loop className="hidden" />

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Guided Breathing</h2>
        <p className={`mb-6 sm:mb-8 text-sm sm:text-base ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Find your inner peace through mindful breathing
        </p>

        {/* Breathing Circle */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-6 sm:mb-8">
          <div className={`absolute inset-0 rounded-full opacity-30 ${isActive ? 'animate-pulse' : ''} ${
            mode === "dark"
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gradient-to-r from-blue-200 to-purple-200"
          }`} />

          <div className={`rounded-full mx-auto flex items-center justify-center font-semibold text-base sm:text-lg shadow-2xl transition-all ease-in-out duration-[4000ms] ${
            isActive && currentPhase.label === "Breathe In"
              ? "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 scale-110"
              : isActive && currentPhase.label === "Breathe Out"
              ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 scale-90"
              : "w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44"
          } ${
            mode === "dark"
              ? "bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white"
              : "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white"
          }`}>
            <div className="text-center px-2">
              <div className="text-lg sm:text-xl font-bold">{currentPhase.label}</div>
              <div className="text-xs sm:text-sm opacity-90 mt-1 leading-tight">{currentPhase.instruction}</div>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-gray-300 dark:border-gray-600">
            <div
              className="absolute inset-0 rounded-full border-2 sm:border-4 border-blue-500 border-t-transparent transition-all duration-100"
              style={{ transform: `rotate(${(progress / 100) * 360}deg)` }}
            />
          </div>
        </div>

        {/* Time Info */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-300">{timeLeft}s</div>
            <div className={`text-xs sm:text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>Time Remaining</div>
          </div>
          <div className="w-px h-6 sm:h-8 bg-gray-300 dark:bg-gray-600" />
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-300">{Math.floor(elapsed / 1000)}s</div>
            <div className={`text-xs sm:text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>Completed</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              setIsActive((prev) => {
                const next = !prev;

                if (!prev) {
                  setPhaseIndex(0);
                  setElapsed(0);
                  setProgress(0);
                  if (audioRef.current && musicOn) {
                    audioRef.current.play().catch(err => console.error("Audio blocked:", err));
                  }
                } else {
                  audioRef.current?.pause();
                }

                return next;
              });
            }}
            className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base w-full sm:w-auto ${
              isActive 
                ? "bg-red-500 hover:bg-red-600 text-white transform hover:scale-105" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-105"
            }`}
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
            {isActive ? "Pause" : "Start Session"}
          </button>

          <button
            onClick={() => {
              setMusicOn((prev) => {
                const newState = !prev;
                if (!newState) audioRef.current?.pause();
                else if (newState && isActive) audioRef.current?.play().catch(() => {});
                return newState;
              });
            }}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto ${
              musicOn 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span className="hidden xs:inline">{musicOn ? "Music On" : "Music Off"}</span>
            <span className="xs:hidden">{musicOn ? "Music" : "Muted"}</span>
          </button>
        </div>

        {/* Completion Message */}
        {!isActive && elapsed > 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-800">
            <p className="font-semibold text-base sm:text-lg text-green-700 dark:text-green-300">Session Complete! 🌟</p>
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">Well done on completing your breathing exercise</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;