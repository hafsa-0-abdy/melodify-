import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const moods = ['Chill', 'Focus', 'Hype', 'Romantic', 'Sad', 'Upbeat'];

const AddSong = () => {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    image: '',
    audio: '',
    mood: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/songs', form);
      alert("✅ Song added successfully!");
      setForm({ title: '', artist: '', image: '', audio: '', mood: '' });
      navigate('/');
    } catch (error) {
      console.error("❌ Failed to add song:", error);
      alert("Error adding song");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center px-4 py-8 text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 w-full max-w-xl rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">🎵 Add a New Track</h2>

        {['title', 'artist', 'image', 'audio'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm text-zinc-300 mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}...`}
              className="w-full p-2 rounded bg-zinc-700 placeholder:text-zinc-500"
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-1">Mood</label>
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          >
            <option value="">Select a mood</option>
            {moods.map((mood, index) => (
              <option key={index} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-violet-600 hover:bg-violet-700 rounded font-medium"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
