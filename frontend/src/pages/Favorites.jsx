import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { likedSongs, playSong } = useMusic();
  const navigate = useNavigate();

  const handleClick = (song, index) => {
    playSong(song, index);
    navigate('/now-playing');
  };

  if (!likedSongs.length) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Favorites ❤️</h2>
        <p className="text-zinc-400">You haven’t liked any songs yet. Like some to see them here!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Your Favorites ❤️</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {likedSongs.map((song, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div onClick={() => handleClick(song, index)} className="cursor-pointer">
              <MusicCard {...song} />
              {song.mood && (
                <span className="absolute bottom-2 left-2 text-xs bg-emerald-600 px-2 py-0.5 rounded-full">
                  {song.mood}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
