import { useEffect, useRef, useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward, FaRedo } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';

const NowPlaying = () => {
  const {
    currentSong,
    playSong,
    currentIndex,
    setCurrentIndex,
    recentlyPlayed,
    repeat,
    setRepeat,
  } = useMusic();

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);
  const navigate = useNavigate();

  const songList = recentlyPlayed.length > 0 ? recentlyPlayed : [];

  useEffect(() => {
    if (!currentSong) navigate('/');
  }, [currentSong, navigate]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleScrub = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
  };

  const handleNext = () => {
    if (songList.length > 0 && currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % songList.length;
      playSong(songList[nextIndex], nextIndex);
    }
  };

  const handlePrev = () => {
    if (songList.length > 0 && currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
      playSong(songList[prevIndex], prevIndex);
    }
  };

  const handleEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  if (!currentSong) return null;

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col items-center">
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6">Now Playing</h2>

        <div className="flex flex-col items-center gap-4">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-60 h-60 rounded-2xl object-cover shadow-xl"
          />
          <div>
            <h3 className="text-xl font-semibold">{currentSong.title}</h3>
            <p className="text-zinc-400 text-sm">{currentSong.artist}</p>
            {currentSong.mood && (
              <span className="text-xs text-emerald-400">#{currentSong.mood}</span>
            )}
          </div>
        </div>

        <audio
          ref={audioRef}
          src={currentSong.audio}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="mt-6 flex items-center justify-center gap-6">
          <button onClick={handlePrev} className="text-xl hover:text-violet-400">
            <FaBackward />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-3xl bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-full"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={handleNext} className="text-xl hover:text-violet-400">
            <FaForward />
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            className={`text-sm ${repeat ? 'text-green-400' : 'text-zinc-500'}`}
          >
            <FaRedo />
          </button>
        </div>

        <div className="mt-4 w-full max-w-lg mx-auto">
          <div
            className="bg-zinc-700 h-2 rounded cursor-pointer"
            onClick={handleScrub}
          >
            <div
              className="bg-violet-500 h-2 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs text-zinc-400">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-40"
          />
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          {currentSong?.id && <CommentSection songId={currentSong.id} />}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;