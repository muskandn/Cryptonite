import GlobalGraph from "../app/frontPage/globalGraph";
import TrendingCoins from "../app/frontPage/trendingCoins";
// import DataFetching from "./coinList/allcoins/dataFetching";
import "./globals.css";
const HomePage = () => {
  return (
    <main>
      <div className="mb-4">
        <GlobalGraph />
      </div>
      <div>
        <TrendingCoins />
      </div>
      {/* <DataFetching /> */}
    </main>
  );
};

export default HomePage;
