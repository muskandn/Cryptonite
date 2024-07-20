// src/components/recentView.js

"use client"
import useWatchlistStore from "../../store/watchlistStore";

const recentView = () => {
  const watchlist=useWatchlistStore((state)=>state.watchlist)
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Watchlist</h2>
        <a href="/coinList/watchlist" className="text-blue-500 ml-auto">
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
            {watchlist.slice(0, 5).map((item, index) => (
              <tr key={index}>
                <td className="py-2 flex items-center border-t">
                  <img
                    src={item.image.thumb}
                    alt={index}
                    className="w-6 h-6 mr-2"
                  />
                  {item.name}
                </td>
                <td className="py-2 border-t">
                  {item.market_data.current_price.usd}
                </td>
                <td className="py-2 text-green-500 border-t">
                  {item.market_data.market_cap_change_percentage_24h}%
                </td>
                <td className="py-2 text-right border-t">
                  {item.market_data.market_cap.usd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default recentView;
