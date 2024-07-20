import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Watchlist from "@/components/watchList";
import Recentview from "@/components/recentView";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cryptonite",
  description: "FRONT-END ASSIGNMENT REVIEW ROUND - GROWW",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="ml-8 mr-8">
        <Header />
        <main className="flex">
          <div className="flex-1 p-4">{children}</div>
          <div className="w-1/3 p-4 space-y-4">
            <Watchlist />
            <Recentview />
          </div>
        </main>
      </body>
    </html>
  );
}
