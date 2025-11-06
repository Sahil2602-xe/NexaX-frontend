import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "@radix-ui/react-icons";
import api from "@/config/api";

const CoinInfo = () => {
  const [btc, setBtc] = useState(null);

  useEffect(() => {
    const fetchBtc = async () => {
      try {
        const res = await api.get("/coins/details/bitcoin");
        setBtc(res.data);
      } catch (error) {
        console.error("Error fetching BTC details:", error);
      }
    };

    fetchBtc();
    const interval = setInterval(fetchBtc, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!btc)
    return (
      <div className="hidden lg:block lg:w-[40%] p-5 text-gray-400">
        Loading Bitcoin data...
      </div>
    );

  const price = btc.market_data?.current_price?.usd || 0;
  const change = btc.market_data?.price_change_percentage_24h || 0;
  const isPositive = change >= 0;

  return (
    <div className="hidden lg:block lg:w-full p-5">
      <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900 border border-gray-700 w-full shadow-sm">
        {/* Coin Image */}
        <Avatar className="h-14 w-14">
          <AvatarImage src={btc.image?.large} />
        </Avatar>

        {/* Coin Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-gray-100 font-bold text-lg uppercase">
              {btc.symbol}
            </p>
            <DotIcon className="text-gray-500" />
            <p className="text-gray-400 text-base">{btc.name}</p>
          </div>

          <div className="flex items-end gap-3 mt-1">
            <p className="text-2xl font-extrabold text-gray-100 tracking-wide">
              ${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </p>
            <p
              className={`text-sm font-semibold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          </div>

          <p className="text-gray-500 text-sm mt-1">
            Market Cap:{" "}
            <span className="text-gray-400 font-medium">
              $
              {btc.market_data?.market_cap?.usd?.toLocaleString("en-US") ||
                "-"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
