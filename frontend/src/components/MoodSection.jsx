import MusicCard from './MusicCard';
import { motion } from 'framer-motion';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';

const MoodSection = ({ title, songs }) => {
  const { playSong, likeSong } = useMusic();
  const navigate = useNavigate();

  const handleClick = (song, index) => {
    playSong(song, index);
    navigate('/now-playing');
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div onClick={() => handleClick(song, index)}>
              <MusicCard {...song} />
              {song.mood && (
                <span className="absolute bottom-2 left-2 text-xs bg-emerald-600 px-2 py-0.5 rounded-full">
                  {song.mood}
                </span>
              )}
            </div>
            <button
              onClick={() => likeSong(song)}
              className="absolute top-2 right-2 bg-zinc-700 p-1 rounded-full text-sm group-hover:opacity-100 opacity-0 transition"
            >
              ❤️
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSection;
