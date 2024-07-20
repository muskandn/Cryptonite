"use client"
import { useState,useEffect} from "react";
import Link from "next/link";
import useCryptoStore from "../../../store/store";
import useRecentlyViewedStore from "../../../store/recentlyViewedStore";
import Image from "next/image";
const TrendingMarket = () => {
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
    const addtoRecentlyViewed = useRecentlyViewedStore(
      (state) => state.addtoRecentlyViewed
    );
    const [showCoinList, setShowCoinList] = useState(false);

    const handleButtonClick = () => {
      setShowCoinList(!showCoinList);
    };

    const handleCoinClick = (coin) => {
      addtoRecentlyViewed(coin);
      window.location.href = `/coin_each/${coin.id}`;
    };

    const formatMarketCap = (marketCap) => {
      if (marketCap >= 1e9) {
        return (marketCap / 1e9).toFixed(2) + "B";
      }
      return marketCap;
    };

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trending Market</h2>
        <Link href="/coinList/allcoins" className="text-blue-500">
          View more coins
        </Link>
        {/* <button
          onClick={handleButtonClick}
          className="px-1 py-1 bg-blue-500 text-white rounded mb-4"
        >
          {showCoinList ? "Hide" : "Show"}
        </button>
        {showCoinList && <Coins />} */}
      </div>
      <div className="overflow-x-auto">
        <div className="overflow-x-auto shadow-md rounded p-4 ">
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
              {cryptocurrencies.slice(0, 5).map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                  className="hover:bg-gray-100 cursor-pointer"
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
                  <td className="py-2 px-4">
                    {formatMarketCap(coin.market_cap)}
                  </td>
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
      </div>
    </div>
  );
};

export default TrendingMarket;
