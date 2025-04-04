import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NowPlaying from './pages/NowPlaying';
import Library from './pages/Library';
import Login from './pages/Login';
import AddSong from './pages/AddSong';
import Favorites from './pages/Favorites';
import MiniPlayer from './components/MiniPlayer';

const AppContent = () => {
  const username = localStorage.getItem('melodifyUser');
  const location = useLocation();
  const hideMiniPlayer = location.pathname === '/now-playing';

  return (
    <div className="bg-zinc-900 min-h-screen">
      {username && <Navbar />}
      <Routes>
        {!username ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add" element={<AddSong />} />
            <Route path="/favorites" element={<Favorites />} />
          </>
        )}
      </Routes>

      {/* ✅ Show MiniPlayer only if not on now-playing */}
      {username && !hideMiniPlayer && <MiniPlayer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
