"use client";

import React, { useState, useEffect } from "react";
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
  const recentlyViewed = useRecentlyViewedStore(
    (state) => state.recentlyViewed
  );
  const pathname = usePathname();

  useEffect(() => {
    console.log("Recently Viewed Coins:", recentlyViewed);
  }, [recentlyViewed]);

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

      <div className="overflow-x-auto bg-white shadow-md rounded p-4 ">
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
            {recentlyViewed.length > 0 &&
              recentlyViewed.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() =>
                    (window.location.href = `/coin_each/${coin.id}`)
                  }
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-4 flex items-center">
                    {coin.image ? (
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 mr-2 bg-gray-200"></div>
                    )}
                    {coin.name || "N/A"}
                  </td>
                  <td className="py-2 px-4">{coin.current_price || "N/A"}</td>
                  <td className="py-2 px-4">{coin.market_cap || "N/A"}</td>
                  <td className="py-2 px-4 text-green-500">
                    {coin.high_24h || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-red-500">
                    {coin.low_24h || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-green-500">
                    {coin.market_cap_change_percentage_24h || "N/A"}%
                  </td>
                  <td className="py-2 px-4">{coin.total_volume || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinList;
