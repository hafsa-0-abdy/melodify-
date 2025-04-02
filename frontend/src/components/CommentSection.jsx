import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = ({ songId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const username = localStorage.getItem('melodifyUser') || 'Guest';

  const fetchComments = () => {
    axios
      .get(`http://127.0.0.1:5000/songs/${songId}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    if (songId) fetchComments();
  }, [songId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    axios
      .post(`http://127.0.0.1:5000/songs/${songId}/comments`, {
        username,
        text,
      })
      .then(() => {
        setText('');
        fetchComments(); // Refresh comments
      })
      .catch((err) => console.error('Submit error:', err));
  };

  return (
    <div className="mt-8 w-full max-w-xl mx-auto text-white">
      <h3 className="text-lg font-semibold mb-2">Comments 💬</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a comment..."
          className="flex-grow p-2 rounded bg-zinc-800 placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="bg-violet-600 px-4 py-2 rounded hover:bg-violet-700"
        >
          Post
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-zinc-400">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="bg-zinc-800 p-2 rounded">
              <span className="font-semibold text-sm">{c.username}</span>
              <p className="text-sm text-zinc-300">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
