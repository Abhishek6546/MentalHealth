import { useState, useRef } from "react";

const tracks = [
  { name: "Forest Calm", src: "/sounds/meditation1.mp3" },
  { name: "Ocean Waves", src: "/sounds/meditation2.mp3" },
];

const MeditationAudio = () => {
  const [current, setCurrent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = (trackSrc: string) => {
    if (current === trackSrc && isPlaying) {
      // Stop current audio
      audioRef.current?.pause();
      setIsPlaying(false);
      setCurrent(null);
    } else {
      // Play new audio
      setCurrent(trackSrc);
      setIsPlaying(true);
    }
  };



  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">🎵 Meditation Music</h2>

      {tracks.map((track) => (
        <div key={track.name} className="mb-4">
          <p className="mb-1">{track.name}</p>
          <button
            onClick={() => handlePlay(track.src)}
            className={`px-4 py-1 rounded ${
              current === track.src && isPlaying
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {current === track.src && isPlaying ? "Stop" : "Play"}
          </button>
        </div>
      ))}

      {current && (
        <div className="mt-4">
          <audio 
            ref={audioRef}
            src={current} 
            controls 
            autoPlay 
            className="w-full"
            onEnded={() => {
              setIsPlaying(false);
              setCurrent(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MeditationAudio;
