import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getUser } from "./state/Auth/Action";
import Auth from "./page/Auth/Auth";
import { Toaster } from "./components/ui/toaster";
import WithdrawalAdmin from "./page/Admin/WithdrawalAdmin";
import NotFound from "./page/Not Found/NotFound";
import SearchCoin from "./page/Search/SearchCoin";
import Profile from "./page/Profile/Profile";
import Watchlist from "./page/Watchlist/Watchlist";
import StockDetails from "./page/Stock Details/StockDetails";
import PaymentDetails from "./page/Payment Details/PaymentDetails";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import { Activity, Wallet } from "lucide-react";
import Portfolio from "./page/Portfolio/Portfolio";
import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
  const jwt = auth.jwt || localStorage.getItem("jwt");
  if (jwt) {
    dispatch(getUser(jwt));
  }
}, [auth.jwt]);


  const isAdmin = auth?.user?.role === "ROLE_ADMIN";

  return (
    <>
      {auth.user ? (
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="px-2 sm:px-4 md:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
              <Route path="/payment-details" element={<PaymentDetails />} />
              <Route path="/market/:id" element={<StockDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<SearchCoin />} />

              <Route
                path="/admin/withdrawals"
                element={
                  isAdmin ? (
                    <WithdrawalAdmin />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Auth />
      )}

      <Toaster />
    </>
  );
}

export default App;
