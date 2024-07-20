import {create} from "zustand";
import { persist } from "zustand/middleware";

const useCryptoStore = create(
  persist(
    (set) => ({
      watchlist: [],
      addToWatchlist: (coin) =>
        set((state) => {
          // Avoid adding duplicate coins
          if (state.watchlist.find((item) => item.id === coin.id)) {
            return state;
          }
          const updatedWatchlist = [...state.watchlist, coin];
          console.log("Updated Watchlist:", updatedWatchlist); // Log the watchlist after updating
          return { watchlist: updatedWatchlist };
        }),
      removeFromWatchlist: (id) =>
        set((state) => {
          const updatedWatchlist = state.watchlist.filter(
            (coin) => coin.id !== id
          );
          console.log("Updated Watchlist:", updatedWatchlist); // Log the watchlist after updating
          return { watchlist: updatedWatchlist };
        }),
    }),
    {
      name: "crypto-watchlist", // unique name for localStorage key
    }
  )
);

export default useCryptoStore;
