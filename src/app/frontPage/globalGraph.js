"use client"


// "use client";
//with changable time period------------------------------------------------------------no need
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const timePeriods = {
//   "1D": "1",
//   "1W": "7",
//   "1M": "30",
//   "1Y": "365",
//   "3Y": "1095",
//   "5Y": "1825",
//   ALL: "max",
// };

// const CoinGraph = ({ params }) => {
//   const [coinData, setCoinData] = useState(null);
//   const [timePeriod, setTimePeriod] = useState("1Y");

//   const fetchCoinData = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
//       },
//     };

//     const coins = ["bitcoin", "ethereum", "litecoin"];
//     const data = await Promise.all(
//       coins.map(async (coin) => {
//         const response = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timePeriods[timePeriod]}`,
//           options
//         );
//         const coinData = await response.json();
//         return {
//           id: coin,
//           prices: coinData.prices,
//         };
//       })
//     );

//     setCoinData(data);
//   };

//   useEffect(() => {
//     fetchCoinData();
//   }, [timePeriod]);

//   const getDataset = (coin) => ({
//     label: coin.id.toUpperCase(),
//     data: coin.prices.map((price) => price[1]),
//     borderColor:
//       coin.id === "bitcoin"
//         ? "rgba(255, 99, 132, 1)"
//         : coin.id === "ethereum"
//         ? "rgba(54, 162, 235, 1)"
//         : "rgba(255, 206, 86, 1)",
//     backgroundColor:
//       coin.id === "bitcoin"
//         ? "rgba(255, 99, 132, 0.2)"
//         : coin.id === "ethereum"
//         ? "rgba(54, 162, 235, 0.2)"
//         : "rgba(255, 206, 86, 0.2)",
//   });

//   const data = {
//     labels: coinData
//       ? coinData[0].prices.map((price) => {
//           const date = new Date(price[0]);
//           return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
//             date.getMonth() + 1
//           }`;
//         })
//       : [],
//     datasets: coinData ? coinData.map((coin) => getDataset(coin)) : [],
//   };

//   return (
//     <div className="graph">
//       <div className="bg-white border border-gray-200 rounded-lg p-4">
//         {coinData ? (
//           <Line data={data} />
//         ) : (
//           <div className="text-center">Loading...</div>
//         )}
//       </div>

//       <div className="flex justify-center my-4 space-x-2">
//         {Object.keys(timePeriods).map((period) => (
//           <button
//             key={period}
//             onClick={() => setTimePeriod(timePeriods[period])}
//             className={`px-4 py-2 rounded ${
//               timePeriod === timePeriods[period]
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {period}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoinGraph;




// "use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinGraph = () => {
  const [coinData, setCoinData] = useState(null);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
      },
    };

    const coins = ["bitcoin", "ethereum", "litecoin"];
    const data = await Promise.all(
      coins.map(async (coin) => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365`,
          options
        );
        const coinData = await response.json();
        return {
          id: coin,
          prices: coinData.prices,
        };
      })
    );

    setCoinData(data);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  const getDataset = (coin) => ({
    label: coin.id.toUpperCase(),
    data: coin.prices.map((price) => price[1]),
    borderColor:
      coin.id === "bitcoin"
        ? "rgba(255, 99, 132, 1)"
        : coin.id === "ethereum"
        ? "rgba(54, 162, 235, 1)"
        : "rgba(255, 206, 86, 1)",
    backgroundColor:
      coin.id === "bitcoin"
        ? "rgba(255, 99, 132, 0.2)"
        : coin.id === "ethereum"
        ? "rgba(54, 162, 235, 0.2)"
        : "rgba(255, 206, 86, 0.2)",
  });

  const data = {
    labels: coinData
      ? coinData[0].prices.map((price) => {
          const date = new Date(price[0]);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        })
      : [],
    datasets: coinData ? coinData.map((coin) => getDataset(coin)) : [],
  };

  return (
    <div className="graph">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {coinData ? (
          <Line data={data} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CoinGraph;
