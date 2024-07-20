import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Watchlist from "@/components/watchList";
import Recentview from "@/components/recentView";
import { ThemeProvider } from "../context/themeContext";
import "./globals.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cryptonite",
  description: "FRONT-END ASSIGNMENT REVIEW ROUND - GROWW",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="ml-8 mr-8">
        {/* <Header />
        <main className="flex">
          <div className="flex-1 p-4">{children}</div>
          <div className="w-1/3 p-4 space-y-4">
            <Watchlist />
            <Recentview />
          </div>
        </main> */}
        <ThemeProvider>
          <Header />
          <main>
            <div >{children}</div>
            {/* <Watchlist /> */}
            {/* <div className="w-1/3 p-4 space-y-4">
              <Watchlist />
              <Recentview />
            </div> */}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

// "use client";
// import { useDrop } from "react-dnd";
// import useWatchlistStore from "../../store/watchlistStore";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/header";
// import Watchlist from "@/components/watchList";
// import Recentview from "@/components/recentView";

// export default function RootLayout({ children }) {
//   const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);

//   const handleDrop = (item) => {
//     addToWatchlist(item.coin);
//   };

//   const [{ isOver }, drop] = useDrop({
//     accept: "coin",
//     drop: (item) => handleDrop(item),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

//   return (
//     <html lang="en">
//       <body className="ml-8 mr-8">
//         <Header />
//         <main className="flex">
//           <div className="flex-1 p-4">{children}</div>
//           <div className="w-1/3 p-4 space-y-4">
//             <div ref={drop} className={`layout ${isOver ? "highlight" : ""}`}>
//               <Watchlist />
//             </div>

//             <Recentview />
//           </div>
//         </main>
//       </body>
//     </html>
//   );
// }
