// src/components/MeditationAudio.tsx
import { useState, useRef } from 'react';
import { Play, Pause, Music, Headphones } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Import theme context

const tracks = [
  { 
    name: "Forest Calm", 
    src: "/sounds/meditation1.mp3",
    description: "Gentle forest sounds for deep relaxation",
    color: "from-green-400 to-emerald-500"
  },
  { 
    name: "Ocean Waves", 
    src: "/sounds/meditation2.mp3",
    description: "Soothing ocean waves for mindfulness",
    color: "from-blue-400 to-cyan-500"
  },
  { 
    name: "Mountain Breeze", 
    src: "/sounds/meditation3.mp3",
    description: "Peaceful mountain air ambience",
    color: "from-purple-400 to-indigo-500"
  },
  { 
    name: "Sunset Serenity", 
    src: "/sounds/meditation4.mp3",
    description: "Warm evening sounds for stress relief",
    color: "from-orange-400 to-pink-500"
  },  
];

const MeditationAudio = () => {
  const { mode } = useTheme(); // light or dark
  const [current, setCurrent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (trackSrc: string) => {
    if (current === trackSrc && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrent(trackSrc);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-3xl shadow-2xl p-8 transition-all duration-300 border 
      ${mode === 'dark' 
        ? 'bg-gray-900 text-white border-gray-700' 
        : 'bg-white text-gray-800 border-gray-100'
      }`}
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <Music className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold">Meditation Music</h2>
        </div>
        <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
          Immerse yourself in calming soundscapes
        </p>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <div key={track.name} className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
            current === track.src
              ? 'border-blue-300 bg-blue-50 dark:bg-blue-900'
              : mode === "dark"
              ? 'border-gray-700 hover:border-gray-500 hover:bg-gray-800'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${track.color} flex items-center justify-center`}>
                  <Headphones className="text-white" size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{track.name}</h3>
                  <p className={mode === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
                    {track.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePlay(track.src)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  current === track.src && isPlaying
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                {current === track.src && isPlaying ? (
                  <>
                    <Pause size={18} />
                    Stop
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Play
                  </>
                )}
              </button>
            </div>

            {current === track.src && (
              <div className="mt-4 pt-4 border-t dark:border-gray-700 border-gray-200">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 180)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {current && (
        <audio
          ref={audioRef}
          src={current}
          autoPlay
          className="hidden"
          onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrent(null);
            setCurrentTime(0);
          }}
        />
      )}
    </div>
  );
};

export default MeditationAudio;