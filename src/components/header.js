// // src/context/themeContext.js
// import { createContext, useState, useContext, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

// src/context/themeContext.js
"use client"
// src/components/Header.js
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchbar";
import { useTheme } from "../context/themeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import Carousel from "./carosel";
import { usePathname } from "next/navigation";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  return (
    <header className={`${theme === "dark" ? "text-white" : "text-black"} mb-5`}>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image src="/com.png" alt="Logo Left" width={40} height={40} />
          </Link>
        </div>
        {pathname !== "/" && <SearchBar />}
        <div className="flex items-center">
          <button onClick={toggleTheme} className="">
            {theme === "light" ? <FiMoon size={30} /> : <FiSun size={30} />}
          </button>
        </div>
      </div>

      {pathname === "/" && (
        <div>
          <div className="container mx-auto p-4">
            <Carousel />
            {/* <SearchBar /> */}
          </div>
        </div>
      )}

      {pathname === "/" && (
        <div className="flex items-center justify-center space-x-10 mt-5">
          {/* <button className="">All Coins</button> */}
          <Link
            href="/coinList/allcoins"
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            All Coins
          </Link>
          <SearchBar />
          <Link
            href="/coinList/watchlist"
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            View Watchlist
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

