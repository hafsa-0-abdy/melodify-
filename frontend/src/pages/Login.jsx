import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (!username.trim()) return alert('Enter a name');
    localStorage.setItem('melodifyUser', username);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center items-center text-white">
      <h2 className="text-3xl font-bold mb-4">Welcome to Melodify 🎧</h2>
      <input
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 rounded bg-zinc-800 text-white placeholder:text-zinc-400"
      />
      <button
        onClick={handleLogin}
        className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded"
      >
        Enter
      </button>
    </div>
  );
};

export default Login;
