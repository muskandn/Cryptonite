// import { cookies } from "next/headers"; // If you need to access cookies
"use client";
import useCryptoStore from "../../../../store/store";
import ViewCoins from "./viewCoins";
import { useEffect } from "react";

// service side data fetching--------------------------------------------------
async function fetchCryptoData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-wp77KNm3ZZbYMWi96zceERbu",
    },
  };

  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    options
  );
  const data = await response.json();
  return data;
}

async function storeData() {
  const cryptocurrencies = await fetchCryptoData();
  const setCryptocurrencies = useCryptoStore.getState().setCryptocurrencies;
  setCryptocurrencies(cryptocurrencies);
}

export default function CryptoData() {
  useEffect(() => {
    storeData();
  }, []);
  return <></>;
  // <ViewCoins />;
}
