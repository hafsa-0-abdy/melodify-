import { Link } from 'react-router-dom';

const Navbar = () => {
  const username = localStorage.getItem('melodifyUser');

  const handleLogout = () => {
    localStorage.removeItem('melodifyUser');
    window.location.href = '/';
  };

  return (
    <div className="bg-zinc-950 text-white px-6 py-3 flex justify-between items-center shadow border-b border-zinc-800 sticky top-0 z-50">
      <h1 className="text-xl font-bold tracking-wide">Melodify 🎧</h1>
      <nav className="space-x-4 flex items-center text-sm">
        <Link to="/" className="hover:text-violet-400">Home</Link>
        <Link to="/now-playing" className="hover:text-violet-400">Now Playing</Link>
        <Link to="/library" className="hover:text-violet-400">Library</Link>
        <Link to="/add" className="hover:text-violet-400">Add Song</Link>
        <Link to="/favorites" className="hover:text-violet-400">Favorites</Link>
        <span className="text-zinc-500">Hi, {username} 👋</span>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
