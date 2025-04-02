import { useMusic } from '../context/MusicContext';
import { useRef, useState } from 'react';

const NowPlaying = () => {
  const { currentSong } = useMusic();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentSong) {
    return <p className="text-white text-center mt-10">No song is playing yet.</p>;
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-6 bg-zinc-900 min-h-screen">
      <img
        src={currentSong.image}
        alt={currentSong.title}
        className="rounded-xl shadow-lg w-72 h-72 object-cover"
      />
      <h2 className="text-2xl mt-6 font-semibold">{currentSong.title}</h2>
      <p className="text-sm text-zinc-400 mb-4">{currentSong.artist}</p>

      <div className="w-full max-w-md mt-4">
        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 w-1/3 transition-all duration-300" />
        </div>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition"
        onClick={handlePlayPause}
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>

      <audio ref={audioRef} src={currentSong.audio} />
    </div>
  );
};

export default NowPlaying;
