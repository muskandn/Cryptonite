"use client";

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

const timePeriods = {
  "1D": "1",
  "1W": "7",
  "1M": "30",
  "1Y": "365",
  "3Y": "1095",
  "5Y": "1825",
  ALL: "max",
};

const CoinGraph = ({ params }) => {
  const [coinData, setCoinData] = useState(null);
  const [timePeriod, setTimePeriod] = useState("1Y");

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
      },
    };

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${timePeriods[timePeriod]}`,
      options
    );
    const data = await response.json();
    setCoinData(data);
  };

  useEffect(() => {
    fetchCoinData();
  }, [timePeriod]);

  const data = {
    labels:
      coinData && coinData.prices
        ? coinData.prices.map((price) => {
            const date = new Date(price[0]);
            return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
              date.getMonth() + 1
            }`;
          })
        : [],
    datasets: [
      {
        label: params.id.toUpperCase(),
        data:
          coinData && coinData.prices
            ? coinData.prices.map((price) => price[1])
            : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <div className="graph">
      <div className="border border-gray-200 rounded-lg p-4">
        {coinData ? (
          <Line data={data} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>

      <div className="flex justify-center my-4 space-x-2">
        {Object.keys(timePeriods).map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-4 py-2 rounded ${
              timePeriod === period ? "bg-blue-500 text-white" : "bg-gray-400"
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinGraph;
