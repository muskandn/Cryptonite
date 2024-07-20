"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCryptoStore from "../../store/store";
import DataFetching from "../../src/app/coinList/allcoins/dataFetching";
import useRecentlyViewedStore from "../../store/recentlyViewedStore";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);

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
  }, [query, cryptocurrencies, recentSearches]);

  //////////--------------------------------------------------------------------------------------------
  const handleSearch = (searchTerm) => {
    const updatedRecentSearches = [...new Set([searchTerm, ...recentSearches])];
    setRecentSearches(updatedRecentSearches);
    addtoRecentlyViewed(searchTerm);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );
    setQuery("");
    setIsFocused(false);
    router.push(`/coin_each/${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch(query);
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
    <div className="relative w-full max-w-lg mx-auto mt-5">
      <DataFetching />
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() =>
                handleSearch(typeof item === "string" ? item : item.name)
              }
            >
              {typeof item === "string" ? item : item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
