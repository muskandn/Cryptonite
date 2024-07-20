"use client"

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useStore from "../../store/store";
import { fetchData } from "../../lib/api";

const GlobalMarketCapChart = () => {
  const { data, setData } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await fetchData();
      if (initialData && initialData.total_market_cap) {
        setData(initialData);
      } else {
        console.error(
          "Initial data is not in the expected format:",
          initialData
        );
      }
      setLoading(false);
    };
    fetchInitialData();
  }, [setData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newData = await fetchData();
      if (newData && newData.total_market_cap) {
        setData(newData);
      } else {
        console.error("Updated data is not in the expected format:", newData);
      }
    }, 60000); // Update every 1 minute

    return () => clearInterval(interval);
  }, [setData]);

  if (loading) return <h3>Loading...</h3>;
  if (!data || !data.total_market_cap) return <h3>Failed to load data.</h3>;

  const chartData = {
    labels: data.total_market_cap.map((entry) =>
      new Date(entry[0]).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Market Cap",
        data: data.total_market_cap.map((entry) => entry[1]),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default GlobalMarketCapChart;