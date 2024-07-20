"use client";

import React, { useState, useEffect } from "react";
import useWatchlistStore from "../../../../store/watchlistStore";
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
  // const [activeTab, setActiveTab] = useState();
  const watchlist = useWatchlistStore((state) => state.watchlist);

  const pathname = usePathname();
  useEffect(() => {
    console.log("hii");
    console.log(watchlist);
  }, [watchlist]);
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
                "price",
                "Marketcap",
                "today's high",
                "today's low",
                "24h change",
                "Volumn",
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
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-4 flex items-center">
                    <img
                      src={coin.image.thumb}
                      alt={coin.name}
                      className="w-6 h-6 mr-2"
                    />
                    {coin.name}
                  </td>
                  <td className="py-2 px-4">
                    {coin.market_data.current_price.usd}
                  </td>
                  <td className="py-2 px-4">
                    {coin.market_data.market_cap.usd}
                  </td>
                  <td className="py-2 px-4 text-green-500">
                    {coin.market_data.high_24h.usd}
                  </td>
                  <td className="py-2 px-4 text-red-500">
                    {coin.market_data.low_24h.usd}
                  </td>
                  <td className="py-2 px-4">
                    {coin.market_data.market_cap_change_24h_in_currency.usd}
                  </td>
                  <td className="py-2 px-4">
                    {coin.market_data.total_volume.usd}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* {displayedCoins.length < watchlist.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreCoins}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default CoinList;
