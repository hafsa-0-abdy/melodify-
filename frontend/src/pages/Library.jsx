import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Library = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/songs')
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Failed to fetch songs:", err));
  }, []);

  if (!songs.length) {
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Library</h2>
        <p className="text-zinc-400">No songs have been added yet 😢</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">📚 Library (All Songs)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-zinc-700 relative"
          >
            <img
              src={song.image}
              alt={song.title}
              className="rounded w-full h-40 object-cover"
            />
            <p className="mt-2 text-sm font-medium">{song.title}</p>
            <p className="text-xs text-zinc-400">{song.artist}</p>

            {/* Admin controls */}
            <div className="absolute top-2 right-2 flex gap-2 text-zinc-400">
              <button title="Edit"><FaEdit size={14} /></button>
              <button title="Delete"><FaTrashAlt size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
