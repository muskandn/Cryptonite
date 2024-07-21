// import React, { useState } from "react";
// import Image from "next/image";
// import useCryptoStore from "../../store/store";
// const coins = [
//   {
//     id: 1,
//     name: "BNB",
//     price: "₹31,856.00",
//     change: "+0.43%",
//     img: "/path/to/bnb.png",
//     description: "Binance Coin",
//   },
//   {
//     id: 2,
//     name: "ADA",
//     price: "₹171.20",
//     change: "+0.63%",
//     img: "/path/to/ada.png",
//     description: "Cardano",
//   },
//   {
//     id: 3,
//     name: "XLM",
//     price: "₹26.98",
//     change: "+5.10%",
//     img: "/path/to/xlm.png",
//     description: "Stellar",
//   },
//   {
//     id: 4,
//     name: "LINK",
//     price: "₹2,038.52",
//     change: "+0.62%",
//     img: "/path/to/link.png",
//     description: "Chainlink",
//   },
//   // Add more coins as needed
// ];

// const Carousel = () => {
//     const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
//   const [selectedCoin, setSelectedCoin] = useState(coins[0]);

//   return (
//     <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Crypto Hunter
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300">
//           Get All The Info Regarding Your Favorite Crypto Currency
//         </p>
//       </div>
//       <div className="w-full overflow-x-auto whitespace-nowrap py-2">
//         {cryptocurrencies.slice(0,10).map((coin) => (
//           <div
//             key={coin.id}
//             className="inline-block w-40 mx-2 text-center cursor-pointer"
//             onClick={() => setSelectedCoin(coin)}
//           >
//             <Image src={coin.img} alt={coin.name} width={50} height={50} />
//             <p className="text-gray-900 dark:text-white">
//               {coin.name} <span className="text-green-500">{coin.change}</span>
//             </p>
//             <p className="text-gray-600 dark:text-gray-300">{coin.price}</p>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 text-center">
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//           {selectedCoin.name}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300">
//           {selectedCoin.description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
"use client";
import React, { useState, useEffect } from "react";
import useCryptoStore from "../../store/store";
import "../app/globals.css";
import Image from "next/image";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptocurrencies.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [cryptocurrencies.length]);

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h2 className="text-6xl font-bold mb-3 uppercase">Cryptonite</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get All The Info Regarding Your Favorite Crypto Currency
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${(currentIndex * 100) / 4}%)` }}
        >
          {cryptocurrencies.map((coin) => (
            <div
              key={coin.id}
              className="w-1/4 flex-shrink-0 flex flex-col items-center justify-center"
            >
              <Image src={coin.image} alt={coin.name} width={50} height={50} />
              <p className="mt-5 text-xl text-bold">
                {coin.name}{" "}
              </p>
              <p className="text-green-500">
                {/* <span className="text-green-500"> */}
                {coin.market_cap_change_percentage_24h}%{/* </span>{" "} */}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {coin.current_price}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {cryptocurrencies[currentIndex].name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {cryptocurrencies[currentIndex].description}
        </p>
      </div> */}
    </div>
  );
};

export default Carousel;
