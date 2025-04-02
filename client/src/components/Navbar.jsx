import { Link } from 'react-router-dom';

const Navbar = () => {
  const username = localStorage.getItem('melodifyUser');

  const handleLogout = () => {
    localStorage.removeItem('melodifyUser');
    window.location.href = '/';
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between items-center border-b border-zinc-700">
      <h1 className="text-xl font-bold">Melodify 🎧</h1>
      <nav className="space-x-6 text-sm flex items-center">
        <Link to="/" className="hover:text-violet-400">Home</Link>
        <Link to="/now-playing" className="hover:text-violet-400">Now Playing</Link>
        <Link to="/library" className="hover:text-violet-400">Library</Link>
        <span className="text-zinc-400 mx-2">Hi, {username} 👋</span>
        <button onClick={handleLogout} className="hover:text-red-400 text-sm">Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
