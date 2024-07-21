
"use client";

import React, { useState, useEffect } from "react";
import useWatchlistStore from "../../../../store/watchlistStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WatchList from "../../../components/watchList";
import Recentview from "../../../components/recentView";
import { CiSquareMinus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
const navLinks = [
  { name: "All Coins", href: "/coinList/allcoins" },
  { name: "Watchlist", href: "/coinList/watchlist" },
  { name: "Recently Viewed", href: "/coinList/recentlyviewed" },
  { name: "Gainers", href: "/coinList/gainers" },
  { name: "Losers", href: "/coinList/losers" },
];

const CoinList = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const removeFromWatchlist = useWatchlistStore(
    (state) => state.removeFromWatchlist
  );
  const pathname = usePathname();

  useEffect(() => {
    console.log("Watchlist:", watchlist);
  }, [watchlist]);

  const handleRemoveFromWatchlist = (coin) => {
    removeFromWatchlist(coin.id);
  };
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(2) + "B";
    }
    return marketCap;
  };
  return (
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
                  "Price",
                  "Marketcap",
                  "Today's High",
                  "Today's Low",
                  "24h Change",
                  "Volume",
                  " ",
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
              {watchlist.length > 0 &&
                watchlist.map((coin) => (
                  <tr
                    key={coin.id}
                    onClick={() =>
                      (window.location.href = `/coin_each/${coin.id}`)
                    }
                    className="hover:bg-gray-400 cursor-pointer"
                  >
                    <td className="py-2 px-4 flex items-center">
                      <Image
                        src={coin.image?.thumb ?? "/default-image.png"}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                        width={20}
                        height={20}
                      />
                      {coin.name}
                    </td>
                    <td className="py-2 px-4">
                      {coin.market_data?.current_price?.usd ?? "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {formatMarketCap(coin.market_data?.market_cap?.usd) ??
                        "N/A"}
                    </td>
                    <td className="py-2 px-4 text-green-600">
                      {coin.market_data?.high_24h?.usd ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 text-red-600">
                      {coin.market_data?.low_24h?.usd ?? "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {coin.market_data?.market_cap_change_percentage_24h ??
                        "N/A"}
                      %
                    </td>
                    <td className="py-2 px-4">
                      {coin.market_data?.total_volume?.usd ?? "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the row click event
                          handleRemoveFromWatchlist(coin);
                        }}
                        className="mb-2"
                      >
                        <RiDeleteBin6Line size={24} color="rgb(239 68 68)" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/3 p-4 space-y-4">
        <WatchList />
        <Recentview />
      </div>
    </div>
  );
};

export default CoinList;
