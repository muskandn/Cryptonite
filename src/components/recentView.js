// src/components/recentView.js

"use client";

import React from "react";
import useRecentlyViewedStore from "../../store/recentlyViewedStore";
import Image from "next/image"
const RecentView = () => {
  const recentlyViewed = useRecentlyViewedStore(
    (state) => state.recentlyViewed
  );

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(2) + "B";
    }
    return marketCap;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recently Viewed</h2>
        <a href="/coinList/recentlyviewed" className="text-blue-500 ml-auto">
          View more coins
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Token</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">24H Change</th>
              <th className="text-right py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {recentlyViewed.slice(0, 5).map((item, index) => (
              <tr key={index}>
                <td className="py-2 flex items-center border-t">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={index}
                      className="w-6 h-6 mr-2"
                      width={20}
                      height={20}
                    />
                  )}

                  {item.name || "NA"}
                </td>
                <td className="py-2 border-t">{item.current_price || "NA"}</td>
                <td className="py-2 text-green-500 border-t">
                  {item.market_cap_change_percentage_24h || "NA"}%
                </td>
                <td className="py-2 text-right border-t">
                  {formatMarketCap(item.market_cap) || "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentView;
