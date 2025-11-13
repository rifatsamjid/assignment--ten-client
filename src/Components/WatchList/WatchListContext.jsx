import { createContext, useContext, useState, useEffect } from "react";


export const WatchListContext = createContext();

// Provider
export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem("watchList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addToWatchList = (movie) => {
    setWatchList((prev) => {
      if (prev.some((m) => m._id === movie._id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchList = (id) => {
    setWatchList((prev) => prev.filter((m) => m._id !== id));
  };

  const isInWatchList = (id) => {
    return watchList.some((m) => m._id === id);
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList, isInWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};


export const useWatchList = () => useContext(WatchListContext);