// // store/recentlyViewedStore.js
// import {create} from "zustand";

// const useRecentlyViewedStore = create((set) => ({
//   recentlyViewed: JSON.parse(localStorage.getItem("recentlyViewed")) || [],
//   addRecentlyViewed: (coin) =>
//     set((state) => {
//       const updatedRecentlyViewed = [
//         ...new Set([coin, ...state.recentlyViewed]),
//       ].slice(0, 5);
//       localStorage.setItem(
//         "recentlyViewed",
//         JSON.stringify(updatedRecentlyViewed)
//       );
//       return { recentlyViewed: updatedRecentlyViewed };
//     }),
// }));

// export default useRecentlyViewedStore;
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecentlyViewedStore = create(
  persist(
    (set) => ({
      recentlyViewed: [],
      addtoRecentlyViewed: (coin) =>
        set((state) => {
        //   Ensure the coin is not already in the list
          const alreadyExists = state.recentlyViewed.some(
            (item) => item.id === coin.id
          );
          const updatedRecentlyViewed = false
            ? state.recentlyViewed
            : [coin, ...state.recentlyViewed.slice(0, 4)]; // Limit to top 5
          return { recentlyViewed: updatedRecentlyViewed };
        }),
      removeFromRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewed: state.recentlyViewed.filter((coin) => coin.id !== id),
        })),
    }),
    {
      name: "crypto-recentlyViewed", // unique name for localStorage key
    }
  )
);

export default useRecentlyViewedStore;

