import GlobalGraph from "../app/frontPage/globalGraph";
import TrendingCoins from "../app/frontPage/trendingCoins";
// import DataFetching from "./coinList/allcoins/dataFetching";
import WatchList from "../components/watchList";
import Recentview from "../components/recentView";
import "./globals.css";
const HomePage = () => {
  return (
    <main>
      <div className="flex-1 container mx-auto p-4">
        <div className="mx-auto mb-4">
          <div className="flex h-full">
            <div className="w-2/3 my-auto mr-4 mb-4">
              <div className="h-2/3 mb-4 shadow-md">
                <GlobalGraph />
              </div>
              <div className="h-1/3 border rounded-lg p-3 shadow-md">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris fringilla sem sit amet sagittis ornare. Suspendisse
                  semper turpis pulvinar commodo suscipit. Maecenas tincidunt
                  efficitur erat, sit amet pretium risus hendrerit id. Aliquam
                  erat volutpat. Vestibulum rutrum lorem vitae magna pulvinar
                  tincidunt. Integer venenatis tincidunt molestie. Sed et
                  feugiat velit, nec congue enim. Nulla et tellus lorem.
                  Pellentesque vitae libero in nisl rhoncus viverra.
                </p>
              </div>
            </div>
            <div className="w-1/3 h-full flex flex-col">
              <div className="h-1/2 mb-4 shadow-md">
                <WatchList className="w-full h-full" />
              </div>
              <div className="h-1/2 shadow-md">
                <Recentview className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <TrendingCoins />
        </div>
      </div>
      {/* <div className="w-1/3 p-4 space-y-4">
        <WatchList />
        <Recentview />
      </div> */}
      {/* <DataFetching /> */}
    </main>
  );
};

export default HomePage;
