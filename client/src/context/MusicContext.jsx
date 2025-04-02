import { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const likeSong = (song) => {
    if (!likedSongs.some((s) => s.title === song.title)) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setRecentlyPlayed((prev) => {
      const alreadyPlayed = prev.find((s) => s.title === song.title);
      if (alreadyPlayed) return prev;
      return [song, ...prev.slice(0, 9)]; // keep last 10
    });
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        likedSongs,
        likeSong,
        recentlyPlayed,
        playSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
