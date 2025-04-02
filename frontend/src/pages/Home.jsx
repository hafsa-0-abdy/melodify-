import axios from 'axios';
import { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const { playSong, likeSong, recentlyPlayed } = useMusic();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const username = localStorage.getItem('melodifyUser');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/songs')
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.error("Backend error:", err);
      });
  }, []);

  const handleClick = (song, index) => {
    console.log('🎵 playing:', song.title);
    playSong(song, index);
    navigate('/now-playing');
  };

  const filteredSongs = songs.filter((song) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Recommended for {username || "You"} 🎧
      </h2>

      {recentlyPlayed.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg text-zinc-300 mb-2">Recently Played</h3>
          <div className="flex overflow-x-auto gap-4">
            {recentlyPlayed.map((song, index) => (
              <div
                key={index}
                onClick={() => handleClick(song, index)}
                className="min-w-[150px] cursor-pointer"
              >
                <MusicCard {...song} />
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search songs or artists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 p-2 mb-4 rounded bg-zinc-800 text-white placeholder:text-zinc-500"
      />

      {searchTerm && (
        <p className="mb-2 text-zinc-400 italic">
          Showing results for: <span className="text-white">"{searchTerm}"</span>
        </p>
      )}

      {filteredSongs.length === 0 ? (
        <p className="text-zinc-400">No songs match your search 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSongs.map((song, index) => (
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
      )}
    </div>
  );
};

export default Home;
