

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import useCryptoStore from "../../../../store/store";
import useRecentlyViewedStore from "../../../../store/recentlyViewedStore";
import useWatchlistStore from "../../../../store/watchlistStore";
import { usePathname } from "next/navigation";
import { CSS } from "@dnd-kit/utilities";
import WatchList from "../../../components/watchList";
import Recentview from "../../../components/recentView"
import Image from "next/image";
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
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
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

  const handleDragEnd = ({ active, over }) => {
    if (over && over.id === "watchlist") {
      const coin = cryptocurrencies.find((c) => c.id === active.id);
      if (coin) {
        addToWatchlist(coin);
      }
    }
  };

  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="flex-1 container mx-auto p-4">
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

          <div className="overflow-x-auto shadow-md rounded p-4">
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
                  <DraggableRow
                    key={coin.id}
                    coin={coin}
                    handleRowClick={handleRowClick}
                  />
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
        <div className="w-1/3 p-4 space-y-4">
          <WatchList />
          <Recentview />
        </div>
      </div>
    </DndContext>
  );
};

const DraggableRow = ({ coin, handleRowClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: coin.id,
  });
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(2) + "B";
    }
    return marketCap;
  };

  const formatTotalVolume = (volume) => {
    if (volume >= 1e9) {
      return "$" + (volume / 1e9).toFixed(2) + "B";
    } else if (volume >= 1e6) {
      return "$" + (volume / 1e6).toFixed(2) + "M";
    }
    return "$" + volume;
  };
  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => handleRowClick(coin)}
      className="hover:bg-gray-400 cursor-pointer"
      draggable
    >
      <td className="py-2 px-4 flex items-center">
        <Image
          src={coin.image}
          alt={coin.name}
          className="w-6 h-6 mr-2"
          width={20}
          height={20}
        />
        {coin.name}
      </td>
      <td className="py-2 px-4">{formatMarketCap(coin.market_cap)}</td>
      <td className="py-2 px-4 text-green-500">
        {coin.market_cap_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="py-2 px-4">{formatTotalVolume(coin.total_volume)}</td>
      <td className="py-2 px-4">{coin.current_price}</td>
      <td className="py-2 px-4 text-green-500">{coin.high_24h.toFixed(2)}</td>
      <td className="py-2 px-4 text-red-500">{coin.low_24h.toFixed(2)}</td>
    </tr>
  );
};

export default CoinList;
