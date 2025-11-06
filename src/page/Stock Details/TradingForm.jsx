import { Input } from '@/components/ui/input'
import { DotIcon } from 'lucide-react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWallet } from '@/state/Wallet/Action'
import { getAssetDetails } from '@/state/Asset/Action'
import { payOrder } from '@/state/Order/Action'
import { useToast } from '@/hooks/use-toast'

export const TradingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { coin, wallet, asset } = useSelector(store => store);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const volume = calculateBuyCost(
      value,
      coin.coinDetails.market_data.current_price.usd
    );
    setQuantity(volume);
  };

  const calculateBuyCost = (amount, price) => {
    if (!price || !amount) return 0;
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  };

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  const handleBuyCrypto = async () => {
    try {
      await dispatch(
        payOrder({
          jwt: localStorage.getItem("jwt"),
          amount,
          orderData: {
            coinId: coin.coinDetails?.id,
            quantity,
            orderType,
          },
        })
      );

      toast({
        title: `${orderType} Successful`,
        description:
          orderType === "BUY"
            ? `You bought ${quantity} ${coin.coinDetails?.symbol.toUpperCase()} successfully.`
            : `You sold ${quantity} ${coin.coinDetails?.symbol.toUpperCase()} successfully.`,
      });

      setAmount(0);
      setQuantity(0);
    } catch (error) {
      console.error(error);
      toast({
        title: `${orderType} Failed`,
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount"
            onChange={handleChange}
            type="number"
            value={amount}
            name="Amount"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p>{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${coin.coinDetails?.market_data.current_price.usd}
            </p>
            <p
              className={`${
                coin.coinDetails?.market_data
                  .price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <span>
                {coin.coinDetails?.market_data.price_change_24h?.toFixed(2)}
              </span>
              <span>
                (
                {coin.coinDetails?.market_data.price_change_percentage_24h?.toFixed(
                  2
                )}
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>
          {orderType === "BUY"
            ? "Available Balance"
            : "Available Quantity"}
        </p>
        <p>
          {orderType === "BUY"
            ? `$${wallet.userWallet?.balance || 0}`
            : asset.assetDetails?.quantity || 0}
        </p>
      </div>

      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`w-full py-6 ${
            orderType === "SELL"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          className="w-full mt-5 text-xl"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};
