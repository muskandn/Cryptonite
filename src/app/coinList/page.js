"use client";

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
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center ">
      <div className="container mx-auto p-4">
        <div className="flex justify-center space-x-4 mb-4">
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
      </div>
    </div>
  );
};

export default CoinList;
