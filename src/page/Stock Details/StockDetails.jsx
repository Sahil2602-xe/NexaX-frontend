import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import { TradingForm } from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/state/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/state/Watchlist/Action";
import { existInWatchlist } from "@/utils/existInWatchList";

const StockDetails = () => {
  const { coin, watchlist } = useSelector((store) => store);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") }));
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id, dispatch]);

  const handleAddToWatchlist = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="p-6 mt-6 space-y-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-slate-800 pb-6">
        <div className="flex gap-5 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">
                {coin.coinDetails?.symbol?.toUpperCase()}
              </p>
              <DotIcon className="text-gray-400" />
              <p className="text-muted-foreground">{coin.coinDetails?.name}</p>
            </div>

            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold">
                ${coin.coinDetails?.market_data.current_price.usd?.toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  coin.coinDetails?.market_data.market_cap_change_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span>
                  {coin.coinDetails?.market_data.market_cap_change_24h?.toFixed(2)}
                </span>
                <span>
                  (
                  {coin.coinDetails?.market_data.market_cap_change_percentage_24h?.toFixed(
                    2
                  )}
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleAddToWatchlist}
            variant="outline"
            size="icon"
            className="rounded-full border-slate-700 hover:bg-slate-800"
          >
            {existInWatchlist(watchlist.coins, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-violet-700 hover:bg-violet-800 text-white px-8 py-6 rounded-lg shadow"
              >
                Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-xl border-slate-800 bg-slate-900">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold mb-2">
                  Trade {coin.coinDetails?.name}
                </DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
