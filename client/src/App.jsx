import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NowPlaying from './pages/NowPlaying';
import Library from './pages/Library';
import Login from './pages/Login';

const App = () => {
  const username = localStorage.getItem('melodifyUser');

  return (
    <Router>
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
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
