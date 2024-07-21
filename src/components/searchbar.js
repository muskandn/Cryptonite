"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCryptoStore from "../../store/store";
import DataFetching from "../../src/app/coinList/allcoins/dataFetching";
import useRecentlyViewedStore from "../../store/recentlyViewedStore";
import { useTheme } from "@/context/themeContext";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
  const theme=useTheme();
  const addtoRecentlyViewed = useRecentlyViewedStore(
    (state) => state.addtoRecentlyViewed
  );
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  useEffect(() => {
    if (query === "") {
      setSuggestions(recentSearches);
    } else {
      const filteredSuggestions = cryptocurrencies.filter((coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }

    console.log("suggestions",suggestions)
  }, [query, cryptocurrencies, recentSearches]);


const handleSearch = (searchTerm) => {
  // Convert the search term to lowercase for comparison
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Update the recent searches, ensuring there are no duplicates
  const updatedRecentSearches = [...new Set([searchTerm, ...recentSearches])];
  setRecentSearches(updatedRecentSearches);

  // Find the coin object with a name matching the search term
  const coinObject = cryptocurrencies.find(
    (coin) => coin.name.toLowerCase() === lowerCaseSearchTerm
  );

  // Add the coin object to recently viewed if it exists
  if (coinObject) {
    addtoRecentlyViewed(coinObject);
    console.log("searchbar", coinObject);
  } else {
    console.log("searchbar", "Coin not found");
  }

  // Save the recent searches to local storage
  localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));

  // Clear the search query and unfocus the search bar
  setQuery("");
  setIsFocused(false);

  // Navigate to the coin's page
  router.push(`/coin_each/${searchTerm}`);
};








  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch(query);
      console.log("key pressed")
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query === "") {
      setSuggestions(recentSearches);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100); // Delay to allow click events to register
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <DataFetching />
      <input
        type="text"
        className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gray-400 border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
          {(query ? suggestions : suggestions.slice(0, 8)).map(
            (item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                onMouseDown={() =>
                  handleSearch(typeof item === "string" ? item : item.id)
                }
              >
                {typeof item === "string" ? item : item.id}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
