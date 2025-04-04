import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (!username.trim()) return alert('Enter a name');
    localStorage.setItem('melodifyUser', username);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Melodify 🎶</h1>
      <p className="text-zinc-400 mb-6 text-sm">Discover. Stream. Vibe.</p>
      <input
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 w-full max-w-sm text-center rounded bg-zinc-800 text-white placeholder:text-zinc-500"
      />
      <button
        onClick={handleLogin}
        className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded text-sm"
      >
        Enter Melodify
      </button>
    </div>
  );
};

export default Login;
