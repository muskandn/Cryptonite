// store/store.js

import {create} from "zustand";

const useCryptoStore = create((set) => ({
  cryptocurrencies: [],
  setCryptocurrencies: (data) => set({ cryptocurrencies: data }),
}));

export default useCryptoStore;
