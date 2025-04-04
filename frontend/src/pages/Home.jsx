import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const { playSong, likeSong } = useMusic();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const username = localStorage.getItem('melodifyUser');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/songs')
      .then(res => setSongs(res.data))
      .catch(err => console.error("Backend error:", err));
  }, []);

  const handleClick = (song, index) => {
    playSong(song, index);
    navigate('/now-playing');
  };

  const filteredSongs = songs.filter(song =>
    `${song.title} ${song.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSection = (title, filter) => {
    const filtered = filteredSongs.filter(filter);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((song, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome back, {username || "Melodify user"} 🎧
      </h2>

      <input
        type="text"
        placeholder="Search songs or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 p-2 mb-6 rounded bg-zinc-800 text-white placeholder:text-zinc-500"
      />

      {renderSection("🔥 Trending Now", (s) => s.mood === 'Hype')}
      {renderSection("🧘 Chill Vibes", (s) => s.mood === 'Chill')}
      {renderSection("🆕 New Releases", (s) => s.mood === 'New')}

      {filteredSongs.length === 0 && (
        <p className="text-zinc-400 italic">No songs found. Try a different keyword 🎵</p>
      )}
    </div>
  );
};

export default Home;
