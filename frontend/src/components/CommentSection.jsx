import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const CommentSection = ({ songId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const username = localStorage.getItem('melodifyUser') || 'Anonymous';
  const bottomRef = useRef(null);

  useEffect(() => {
    if (songId) {
      axios.get(`http://127.0.0.1:5000/songs/${songId}/comments`)
        .then(res => setComments(res.data))
        .catch(err => console.error("💬 Fetch error:", err));
    }
  }, [songId]);

  const handlePost = () => {
    if (!text.trim()) return;

    axios.post(`http://127.0.0.1:5000/songs/${songId}/comments`, {
      username,
      text
    })
    .then(() => {
      setComments(prev => [...prev, { username, text }]);
      setText('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    })
    .catch(err => console.error("🔥 Error posting comment:", err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl bg-zinc-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-white">💬 Comments</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-zinc-400 text-sm">No comments yet. Be the first!</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="bg-zinc-700 px-3 py-2 rounded text-sm">
              <span className="font-semibold text-violet-400">{c.username}</span>: {c.text}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 rounded bg-zinc-900 text-white placeholder:text-zinc-500"
        />
        <button
          onClick={handlePost}
          className="bg-violet-600 px-4 py-2 rounded text-sm hover:bg-violet-700"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
