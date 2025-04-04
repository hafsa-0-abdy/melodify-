import { useMusic } from '../context/MusicContext';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const MiniPlayer = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    playSong,
    currentIndex,
    recentlyPlayed
  } = useMusic();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress(audioRef.current.currentTime / audioRef.current.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (recentlyPlayed.length > 0 && currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % recentlyPlayed.length;
      playSong(recentlyPlayed[nextIndex], nextIndex);
    }
  };

  const handlePrev = () => {
    if (recentlyPlayed.length > 0 && currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + recentlyPlayed.length) % recentlyPlayed.length;
      playSong(recentlyPlayed[prevIndex], prevIndex);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 text-white flex flex-col px-4 py-2 shadow-md z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/now-playing')}>
          <img src={currentSong.image} alt={currentSong.title} className="w-12 h-12 object-cover rounded" />
          <div>
            <p className="text-sm font-semibold truncate max-w-[150px]">{currentSong.title}</p>
            <p className="text-xs text-zinc-400 truncate max-w-[150px]">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handlePrev} className="text-sm hover:text-violet-400">
            <FaBackward />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xl hover:text-violet-400"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNext} className="text-sm hover:text-violet-400">
            <FaForward />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-zinc-700 rounded mt-2 overflow-hidden">
        <div className="h-1 bg-violet-500" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* Hidden audio for progress syncing */}
      <audio ref={audioRef} src={currentSong.audio} hidden />
    </div>
  );
};

export default MiniPlayer;