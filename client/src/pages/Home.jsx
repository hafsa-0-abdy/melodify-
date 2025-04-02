import MusicCard from '../components/MusicCard';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const dummySongs = [
  {
    title: 'Lost in the City Lights',
    artist: 'Nightshade',
    image: 'https://picsum.photos/300?random=1',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Sunset Boulevard',
    artist: 'Nova',
    image: 'https://picsum.photos/300?random=2',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Ocean Dreams',
    artist: 'Kairos',
    image: 'https://picsum.photos/300?random=3',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const Home = () => {
  const { playSong, likeSong, recentlyPlayed } = useMusic();
  const navigate = useNavigate();
  const [songs, setSongs] = useState(dummySongs);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = (song) => {
    playSong(song);
    navigate('/now-playing');
  };

  const filteredSongs = songs.filter((song) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>

      {recentlyPlayed.length > 0 && (
        <div className="mb-6">
          <div className="flex overflow-x-auto gap-4">
            {recentlyPlayed.map((song, index) => (
              <div
                key={index}
                onClick={() => handleClick(song)}
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

      {filteredSongs.length === 0 ? (
        <p className="text-zinc-400">No songs match your search 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredSongs.map((song, index) => (
            <div key={index} className="relative group">
              <div onClick={() => handleClick(song)}>
                <MusicCard {...song} />
              </div>
              <button
                onClick={() => likeSong(song)}
                className="absolute top-2 right-2 bg-zinc-700 p-1 rounded-full text-sm group-hover:opacity-100 opacity-0 transition"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
