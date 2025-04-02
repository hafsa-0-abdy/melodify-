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
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add a New Song 🎶</h2>

        {['title', 'artist', 'image', 'audio'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm mb-1">Mood</label>
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white"
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
