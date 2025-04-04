// ✅ Updated MusicContext with inProgress support
import { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [inProgress, setInProgress] = useState([]);

  const playSong = (song, index = 0) => {
    setCurrentSong(song);
    setCurrentIndex(index);
    setRecentlyPlayed((prev) => {
      const alreadyExists = prev.some((s) => s.id === song.id);
      if (alreadyExists) return prev;
      return [song, ...prev];
    });
  };

  const likeSong = (song) => {
    if (!likedSongs.some((s) => s.id === song.id)) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };

  const markInProgress = (song) => {
    if (!inProgress.find((s) => s.id === song.id)) {
      setInProgress((prev) => [...prev, song]);
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
        playSong,
        repeat,
        setRepeat,
        inProgress,
        markInProgress
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);