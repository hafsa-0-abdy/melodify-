import { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [repeat, setRepeat] = useState(false);

  // ✅ Play selected song + save to recently played
  const playSong = (song, index = 0) => {
    setCurrentSong(song);
    setCurrentIndex(index);

    // Add to recently played (without duplicates)
    setRecentlyPlayed((prev) => {
      const alreadyExists = prev.some((s) => s.id === song.id);
      if (alreadyExists) return prev;
      return [song, ...prev];
    });
  };

  // ✅ Like a song
  const likeSong = (song) => {
    if (!likedSongs.some((s) => s.id === song.id)) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        recentlyPlayed,
        setRecentlyPlayed,
        likedSongs,
        likeSong,
        playSong,     // ✅ export playSong
        repeat,
        setRepeat,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
