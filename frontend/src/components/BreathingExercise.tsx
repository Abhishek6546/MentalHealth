import { useEffect, useRef, useState } from "react";

const phases = [
  { label: "Breathe In", duration: 4000 },
  { label: "Hold", duration: 3000 },
  { label: "Breathe Out", duration: 4000 },
  { label: "Hold", duration: 3000 },
];

const TOTAL_SESSION_MS = 60000; // 1 minute

const BreathingExercise = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentPhase = phases[phaseIndex];

  useEffect(() => {
    if (isActive) {
      const interval = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % phases.length);
        setElapsed((prev) => prev + currentPhase.duration);
      }, currentPhase.duration);

      return () => clearTimeout(interval);
    }
  }, [phaseIndex, isActive, currentPhase.duration]);

  useEffect(() => {
    if (isActive && audioRef.current && musicOn) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isActive, musicOn]);

  useEffect(() => {
    if (elapsed >= TOTAL_SESSION_MS && isActive) {
      setIsActive(false);
      setElapsed(0);
    }
  }, [elapsed, isActive]);

  return (
    <div className="bg-white shadow max-w-md mx-auto p-6 rounded text-center mt-6">
      <h2 className="text-2xl font-bold mb-4">Guided Breathing</h2>

      <div className="relative w-48 h-48 mx-auto my-6">
        <div
          className={`rounded-full bg-blue-300 transition-all ease-in-out duration-[4000ms] mx-auto ${
            currentPhase.label === "Breathe In"
              ? "w-48 h-48"
              : currentPhase.label === "Breathe Out"
              ? "w-28 h-28"
              : "w-36 h-36"
          }`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-blue-800">
          {currentPhase.label}
        </div>
      </div>

      <p className="text-gray-600 mb-2">
        Time left: {(TOTAL_SESSION_MS - elapsed) / 1000}s
      </p>

      <div className="flex justify-center space-x-3 mt-4">
        <button
          onClick={() => {
            setIsActive((prev) => !prev);
            if (!isActive) {
              setPhaseIndex(0);
              setElapsed(0);
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isActive ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => setMusicOn((prev) => !prev)}
          className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
        >
          {musicOn ? "Mute Music" : "Play Music"}
        </button>
      </div>

      <audio ref={audioRef} loop src="/sounds/breathe.mp3" />

      {!isActive && elapsed > 0 && (
        <p className="text-green-600 font-medium mt-4">Well done! 🎉</p>
      )}
    </div>
  );
};

export default BreathingExercise;
