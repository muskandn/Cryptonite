// "use client";

// import React, { useState, useEffect } from "react";
// import useCryptoStore from "../../../../store/store";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navLinks = [
//   { name: "All Coins", href: "/coinList/allcoins" },
//   { name: "Watchlist", href: "/coinList/watchlist" },
//   { name: "Gainers", href: "/coinList/gainers" },
//   { name: "Losers", href: "/coinList/losers" },
//   { name: "Recently sold", href: "/coinList/recentlysold" },
// ];

// const CoinList=()=> {
//   // const [activeTab, setActiveTab] = useState();
//   const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
//   const [displayedCoins, setDisplayedCoins] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
//   const pathname = usePathname();

  
//   useEffect(() => {
//     console.log(cryptocurrencies);
//     const calculateItemsToShow = () => {
//       setDisplayedCoins(cryptocurrencies.slice(0, 20));
//     };

//     calculateItemsToShow();
//     window.addEventListener("resize", calculateItemsToShow);

//     return () => {
//       window.removeEventListener("resize", calculateItemsToShow);
//     };
//   }, [cryptocurrencies]);







//   const loadMoreCoins = () => {
//     const moreCoins = cryptocurrencies.slice(
//       displayedCoins.length,
//       displayedCoins.length + itemsPerPage
//     );
//     setDisplayedCoins([...displayedCoins, ...moreCoins]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex space-x-4 mb-4">
//         {navLinks.map((link) => {
//           const isActive = pathname.startsWith(link.href);
//           return (
//             <Link
//               href={link.href}
//               key={link.name}
//               className={`px-4 py-2 border-2 rounded-lg ${
//                 isActive ? "border-blue-500" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           );
//         })}
//       </div>

//       <div className="overflow-x-auto bg-white shadow-md rounded p-4 ">
//         <table className="min-w-full leading-normal">
//           <thead>
//             <tr>
//               {[
//                 "Name",
//                 "Marketcap",
//                 "24h change",
//                 "Balance",
//                 "Price",
//                 "24h high",
//                 "24h low",
//               ].map((header) => (
//                 <th
//                   key={header}
//                   className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {displayedCoins.map((coin) => (
//               <tr
//                 key={coin.id}
//                 onClick={() => (window.location.href = `/coin_each/${coin.id}`)}
//                 className="hover:bg-gray-100 cursor-pointer"
//               >
//                 <td className="py-2 px-4 flex items-center">
//                   <img
//                     src={coin.image}
//                     alt={coin.name}
//                     className="w-6 h-6 mr-2"
//                   />
//                   {coin.name}
//                 </td>
//                 <td className="py-2 px-4">{coin.market_cap}</td>
//                 <td className="py-2 px-4 text-green-500">
//                   {coin.market_cap_change_percentage_24h}%
//                 </td>
//                 <td className="py-2 px-4">{coin.total_volume}</td>
//                 <td className="py-2 px-4">{coin.current_price}</td>
//                 <td className="py-2 px-4 text-green-500">{coin.high_24h}</td>
//                 <td className="py-2 px-4 text-red-500">{coin.low_24h}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {displayedCoins.length < cryptocurrencies.length && (
//         <div className="text-center mt-4">
//           <button
//             onClick={loadMoreCoins}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CoinList;




///recently viewed store

"use client";

import React, { useState, useEffect } from "react";
import useCryptoStore from "../../../../store/store";
import useRecentlyViewedStore from "../../../../store/recentlyViewedStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "All Coins", href: "/coinList/allcoins" },
  { name: "Watchlist", href: "/coinList/watchlist" },
  { name: "Recently Viewed", href: "/coinList/recentlyviewed" },
  { name: "Gainers", href: "/coinList/gainers" },
  { name: "Losers", href: "/coinList/losers" },
];

const CoinList = () => {
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
  const addRecentlyViewed = useRecentlyViewedStore(
    (state) => state.addtoRecentlyViewed
  );
  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const pathname = usePathname();

  useEffect(() => {
    const calculateItemsToShow = () => {
      setDisplayedCoins(cryptocurrencies.slice(0, 20));
    };

    calculateItemsToShow();
    window.addEventListener("resize", calculateItemsToShow);

    return () => {
      window.removeEventListener("resize", calculateItemsToShow);
    };
  }, [cryptocurrencies]);

  const loadMoreCoins = () => {
    const moreCoins = cryptocurrencies.slice(
      displayedCoins.length,
      displayedCoins.length + itemsPerPage
    );
    setDisplayedCoins([...displayedCoins, ...moreCoins]);
  };

  const handleRowClick = (coin) => {
    addRecentlyViewed(coin);
    window.location.href = `/coin_each/${coin.id}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              className={`px-4 py-2 border-2 rounded-lg ${
                isActive ? "border-blue-500" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded p-4">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {[
                "Name",
                "Marketcap",
                "24h change",
                "Balance",
                "Price",
                "24h high",
                "24h low",
              ].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedCoins.map((coin) => (
              <tr
                key={coin.id}
                onClick={() => handleRowClick(coin)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4 flex items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name}
                </td>
                <td className="py-2 px-4">{coin.market_cap}</td>
                <td className="py-2 px-4 text-green-500">
                  {coin.market_cap_change_percentage_24h}%
                </td>
                <td className="py-2 px-4">{coin.total_volume}</td>
                <td className="py-2 px-4">{coin.current_price}</td>
                <td className="py-2 px-4 text-green-500">{coin.high_24h}</td>
                <td className="py-2 px-4 text-red-500">{coin.low_24h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayedCoins.length < cryptocurrencies.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreCoins}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CoinList;



//--------------------use chrome muskandn02@gmial.com
//some error is coming --------------------------------- after 10:40am
// "use client";

// import React, { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { useDrag, useDrop, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import Link from "next/link";
// import useCryptoStore from "../../../../store/store";
// import useWatchlistStore from "../../../../store/watchlistStore";

// const navLinks = [
//   { name: "All Coins", href: "/coinList/allcoins" },
//   { name: "Watchlist", href: "/coinList/watchlist" },
//   { name: "Gainers", href: "/coinList/gainers" },
//   { name: "Losers", href: "/coinList/losers" },
//   { name: "Recently sold", href: "/coinList/recentlysold" },
// ];

// const CoinList = () => {
//   const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
//   const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
//   const [displayedCoins, setDisplayedCoins] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
//   const pathname = usePathname();

//   useEffect(() => {
//     const calculateItemsToShow = () => {
//       setDisplayedCoins(cryptocurrencies.slice(0, 20));
//     };

//     calculateItemsToShow();
//     window.addEventListener("resize", calculateItemsToShow);

//     return () => {
//       window.removeEventListener("resize", calculateItemsToShow);
//     };
//   }, [cryptocurrencies]);

//   const loadMoreCoins = () => {
//     const moreCoins = cryptocurrencies.slice(
//       displayedCoins.length,
//       displayedCoins.length + itemsPerPage
//     );
//     setDisplayedCoins([...displayedCoins, ...moreCoins]);
//   };

//   const handleDrop = (item) => {
//     addToWatchlist(item);
//   };

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "coin",
//     drop: (item) => handleDrop(item),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="container mx-auto p-4">
//         <div className="flex space-x-4 mb-4">
//           {navLinks.map((link) => {
//             const isActive = pathname.startsWith(link.href);
//             return (
//               <Link
//                 href={link.href}
//                 key={link.name}
//                 className={`px-4 py-2 border-2 rounded-lg ${
//                   isActive ? "border-blue-500" : ""
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="overflow-x-auto bg-white shadow-md rounded p-4">
//           <table className="min-w-full leading-normal">
//             <thead>
//               <tr>
//                 {[
//                   "Name",
//                   "Marketcap",
//                   "24h change",
//                   "Balance",
//                   "Price",
//                   "24h high",
//                   "24h low",
//                 ].map((header) => (
//                   <th
//                     key={header}
//                     className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {displayedCoins.map((coin) => (
//                 <CoinRow key={coin.id} coin={coin} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {displayedCoins.length < cryptocurrencies.length && (
//           <div className="text-center mt-4">
//             <button
//               onClick={loadMoreCoins}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//         <div
//           ref={drop}
//           className={`mt-4 p-4 border-dashed border-2 rounded ${
//             isOver ? "border-blue-500" : "border-gray-300"
//           }`}
//         >
//           Drop here to add to Watchlist
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// const CoinRow = ({ coin }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "coin",
//     item: coin,
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <tr
//       ref={drag}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//       className="hover:bg-gray-100 cursor-pointer"
//     >
//       <td className="py-2 px-4 flex items-center">
//         <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
//         {coin.name}
//       </td>
//       <td className="py-2 px-4">{coin.market_cap}</td>
//       <td className="py-2 px-4 text-green-500">
//         {coin.market_cap_change_percentage_24h}%
//       </td>
//       <td className="py-2 px-4">{coin.total_volume}</td>
//       <td className="py-2 px-4">{coin.current_price}</td>
//       <td className="py-2 px-4 text-green-500">{coin.high_24h}</td>
//       <td className="py-2 px-4 text-red-500">{coin.low_24h}</td>
//     </tr>
//   );
// };

// export default CoinList;
