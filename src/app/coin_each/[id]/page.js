


// "use client";

// import React, { useState, useEffect } from "react";
// import CoinGraph from "./coinGraph";
// import useCryptoStore from "../../../../store/watchlistStore";

// const Coin = ({ params }) => {
//   const [coinData, setCoinData] = useState();
//   const addToWatchlist = useCryptoStore((state) => state.addToWatchlist);
//   const watchlist = useCryptoStore((state) => state.watchlist);
//   const [isAdded, setIsAdded] = useState(false);

//   const fetchCoinData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
//       },
//     };

//     fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`, options)
//       .then((response) => response.json())
//       .then((response) => setCoinData(response))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchCoinData();
//     // console.log(watchlist)
//   }, []);

//   useEffect(() => {
//     if (coinData && watchlist.find((coin) => coin.id === coinData.id)) {
//       setIsAdded(true);
//     }
//   }, [coinData, watchlist]);

//   const handleAddToWatchlist = () => {
//     addToWatchlist(coinData);
//     setIsAdded(true);
//     console.log(coinData)
//   };

//   if (coinData) {
//     return (
//       <div>
//         {coinData.image && coinData.image.large && (
//           <img
//             src={coinData.image.large}
//             alt={coinData.name}
//             className="w-12 h-12 mr-2 border p-2 mb-2 rounded-md"
//           />
//         )}

//         <h2 className="font-semibold text-gray-500 mb-2">{coinData.name}</h2>
//         <div className="flex justify-between">
//           <div>
//             <h1 className="font-semibold mb-2 text-xl">
//               ${coinData.market_data.current_price.usd}
//             </h1>
//           </div>
//           <button
//             onClick={handleAddToWatchlist}
//             className={`px-4 py-2 rounded mb-4 ${
//               isAdded
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-blue-500 text-white"
//             }`}
//             disabled={isAdded}
//           >
//             {isAdded ? "Added" : "Add to Watchlist"}
//           </button>
//         </div>

//         <CoinGraph params={params} />
//         <div className="p-4">
//           <div className="mt-8">
//             <div className="mb-16">
//               <h2 className="text-xl font-semibold mb-4">Performance</h2>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3>Today's Low</h3>
//                   <h3 className="font-semibold">
//                     {coinData.market_data.low_24h.usd}
//                   </h3>
//                 </div>
//                 <div className="w-1/2 bg-green-200 h-2 rounded-full mx-4 relative">
//                   <div
//                     className="bg-green-500 h-full rounded-full absolute"
//                     style={{
//                       width: `${
//                         ((coinData.market_data.current_price.usd -
//                           coinData.market_data.low_24h.usd) /
//                           (coinData.market_data.high_24h.usd -
//                             coinData.market_data.low_24h.usd)) *
//                         100
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//                 <div>
//                   <h3>Today's High</h3>
//                   <h3 className="font-semibold">
//                     {coinData.market_data.high_24h.usd}
//                   </h3>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center mt-4">
//                 <div>
//                   <h3>52W Low</h3>
//                   <h3 className="font-semibold">
//                     {coinData.market_data.atl.usd}
//                   </h3>
//                 </div>
//                 <div className="w-1/2 bg-green-200 h-2 rounded-full mx-4 relative">
//                   <div
//                     className="bg-green-500 h-full rounded-full absolute"
//                     style={{
//                       width: `${
//                         ((coinData.market_data.current_price.usd -
//                           coinData.market_data.atl.usd) /
//                           (coinData.market_data.ath.usd -
//                             coinData.market_data.atl.usd)) *
//                         100
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//                 <div>
//                   <h3>52W High</h3>
//                   <h3 className="font-semibold">
//                     {coinData.market_data.ath.usd}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//             <div className="mb-16 w-1/2">
//               <h2 className="text-xl font-semibold mb-4">Fundamentals</h2>
//               <ul>
//                 <li className="flex justify-between mb-2">
//                   <span>Market Cap</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.market_cap.usd}
//                   </span>
//                 </li>
//                 <li className="flex justify-between mb-2">
//                   <span>Fully Diluted Valuation</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.fully_diluted_valuation.usd}
//                   </span>
//                 </li>
//                 <li className="flex justify-between mb-2">
//                   <span>24 Hour Trading Vol</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.total_volume.usd}
//                   </span>
//                 </li>
//                 <li className="flex justify-between mb-2">
//                   <span>Circulating Supply</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.circulating_supply}
//                   </span>
//                 </li>
//                 <li className="flex justify-between mb-2">
//                   <span>Total Supply</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.total_supply}
//                   </span>
//                 </li>
//                 <li className="flex justify-between">
//                   <span>Max Supply</span>
//                   <span className="font-semibold">
//                     {coinData.market_data.max_supply}
//                   </span>
//                 </li>
//               </ul>
//             </div>
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-4">
//                 About {coinData.name}
//               </h2>
//               <h3>{coinData.description.en}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return <div>Loading...</div>;
//   }
// };

// export default Coin;

"use client";

import React, { useState, useEffect } from "react";
import CoinGraph from "./coinGraph";
import useCryptoStore from "../../../../store/watchlistStore";
import WatchList from "../../../components/watchList";
import Recentview from "../../../components/recentView";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

const Coin = ({ params }) => {
  const [coinData, setCoinData] = useState();
  const addToWatchlist = useCryptoStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useCryptoStore(
    (state) => state.removeFromWatchlist
  );
  const watchlist = useCryptoStore((state) => state.watchlist);
  const [isAdded, setIsAdded] = useState(false);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  useEffect(() => {
    if (coinData && watchlist.find((coin) => coin.id === coinData.id)) {
      setIsAdded(true);
    }
  }, [coinData, watchlist]);

  const handleAddToWatchlist = () => {
    addToWatchlist(coinData);
    setIsAdded(true);
    console.log(coinData);
  };

  const handleremoveFromWatchlist=()=>{
    removeFromWatchlist(params.id);
    setIsAdded(false);
  }
  if (coinData) {
    return (
      <div className="flex">
        <div className="flex-1 container mx-auto p-4">
          {coinData.image?.large && (
            <img
              src={coinData.image.large}
              alt={coinData.name}
              className="w-12 h-12 mr-2 border p-2 mb-2 rounded-md"
            />
          )}

          <h2 className="font-semibold text-gray-500 mb-2">{coinData.name}</h2>
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold mb-2 text-xl">
                ${coinData.market_data?.current_price?.usd || "N/A"}
              </h1>
            </div>
            <div className="flex">
              {!isAdded && (
                <button
                  onClick={handleAddToWatchlist}
                  className="mb-2 "
                  disabled={isAdded}
                >
                  {isAdded ? (
                    "Added to Watchlist"
                  ) : (
                    <CiSquarePlus size={40} color="rgb(59 130 246)"/>
                  )}
                </button>
              )}
              {isAdded && (
                <button onClick={handleremoveFromWatchlist} className="mb-2">
                  <CiSquareMinus size={40} color="rgb(59 130 246)" />
                </button>
              )}
            </div>
          </div>

          <CoinGraph params={params} />
          <div className="p-4">
            <div className="mt-8">
              <div className="mb-16">
                <h2 className="text-xl font-semibold mb-4">Performance</h2>
                <div className="flex justify-between items-center">
                  <div>
                    <h3>Today's Low</h3>
                    <h3 className="font-semibold">
                      ${coinData.market_data?.low_24h?.usd || "N/A"}
                    </h3>
                  </div>
                  <div className="w-1/2 bg-green-200 h-2 rounded-full mx-4 relative">
                    <div
                      className="bg-green-500 h-full rounded-full absolute"
                      style={{
                        width: `${
                          ((coinData.market_data?.current_price?.usd -
                            coinData.market_data?.low_24h?.usd) /
                            (coinData.market_data?.high_24h?.usd -
                              coinData.market_data?.low_24h?.usd)) *
                            100 || 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <h3>Today's High</h3>
                    <h3 className="font-semibold">
                      ${coinData.market_data?.high_24h?.usd || "N/A"}
                    </h3>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h3>52W Low</h3>
                    <h3 className="font-semibold">
                      ${coinData.market_data?.atl?.usd || "N/A"}
                    </h3>
                  </div>
                  <div className="w-1/2 bg-green-200 h-2 rounded-full mx-4 relative">
                    <div
                      className="bg-green-500 h-full rounded-full absolute"
                      style={{
                        width: `${
                          ((coinData.market_data?.current_price?.usd -
                            coinData.market_data?.atl?.usd) /
                            (coinData.market_data?.ath?.usd -
                              coinData.market_data?.atl?.usd)) *
                            100 || 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <h3>52W High</h3>
                    <h3 className="font-semibold">
                      ${coinData.market_data?.ath?.usd || "N/A"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="mb-16 w-1/2">
                <h2 className="text-xl font-semibold mb-4">Fundamentals</h2>
                <ul>
                  <li className="flex justify-between mb-2">
                    <span>Market Cap</span>
                    <span className="font-semibold">
                      ${coinData.market_data?.market_cap?.usd || "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between mb-2">
                    <span>Fully Diluted Valuation</span>
                    <span className="font-semibold">
                      $
                      {coinData.market_data?.fully_diluted_valuation?.usd ||
                        "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between mb-2">
                    <span>24 Hour Trading Vol</span>
                    <span className="font-semibold">
                      ${coinData.market_data?.total_volume?.usd || "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between mb-2">
                    <span>Circulating Supply</span>
                    <span className="font-semibold">
                      {coinData.market_data?.circulating_supply || "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between mb-2">
                    <span>Total Supply</span>
                    <span className="font-semibold">
                      {coinData.market_data?.total_supply || "N/A"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Max Supply</span>
                    <span className="font-semibold">
                      {coinData.market_data?.max_supply || "N/A"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  About {coinData.name}
                </h2>
                <h3>
                  {coinData.description?.en || "No description available"}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4 space-y-4">
          <WatchList />
          <Recentview />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Coin;
