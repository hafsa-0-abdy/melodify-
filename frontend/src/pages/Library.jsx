import { useMusic } from '../context/MusicContext';

const Library = () => {
  const { likedSongs } = useMusic();

  if (!likedSongs.length) {
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
        <p className="text-zinc-400">You haven’t liked any songs yet 💔</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {likedSongs.map((song, index) => (
          <div key={index} className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700">
            <img src={song.image} alt={song.title} className="rounded w-full h-40 object-cover" />
            <p className="mt-2 text-sm font-medium">{song.title}</p>
            <p className="text-xs text-zinc-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
