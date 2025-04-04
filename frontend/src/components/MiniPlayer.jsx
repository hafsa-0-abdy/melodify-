import { useMusic } from '../context/MusicContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MiniPlayer = () => {
  const { currentSong, isPlaying, setIsPlaying } = useMusic();
  const navigate = useNavigate();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 text-white flex items-center justify-between px-4 py-2 shadow-md z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/now-playing')}>
        <img src={currentSong.image} alt={currentSong.title} className="w-12 h-12 object-cover rounded" />
        <div>
          <p className="text-sm font-semibold">{currentSong.title}</p>
          <p className="text-xs text-zinc-400">{currentSong.artist}</p>
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="text-xl p-2 hover:text-violet-400"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default MiniPlayer;
