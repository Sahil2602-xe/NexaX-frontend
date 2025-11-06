import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderForUser } from '@/state/Order/Action'
import { calculateProfit } from '@/utils/calculateProfit'

const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllOrderForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  // ✅ Helper function to format timestamp dynamically
  const formatDateTime = (timestamp) => {
    if (!timestamp) return { date: "-", time: "-" };
    const dateObj = new Date(timestamp);
    const date = dateObj.toLocaleDateString('en-GB'); // Example: 04/11/2025
    const time = dateObj.toLocaleTimeString('en-GB', { hour12: false }); // Example: 19:55:53
    return { date, time };
  };

  return (
    <div className="p-5 lg:px-20 text-gray-200">
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="font-bold text-3xl tracking-tight text-white">Activity</h1>
        <p className="text-gray-400 text-sm">
          Overview of your recent trades and transactions
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#0f1115]/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <Table className="w-full text-sm">
          <TableHeader className="bg-[#1a1d23]/80">
            <TableRow>
              <TableHead className="py-4 font-semibold text-gray-300">Date & Time</TableHead>
              <TableHead className="font-semibold text-gray-300">COINS</TableHead>
              <TableHead className="font-semibold text-gray-300">Buy Price</TableHead>
              <TableHead className="font-semibold text-gray-300">Sell Price</TableHead>
              <TableHead className="font-semibold text-gray-300">Order Type</TableHead>
              <TableHead className="font-semibold text-gray-300">Profit / Loss</TableHead>
              <TableHead className="text-center font-semibold text-gray-300">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order?.orders?.length > 0 ? (
              order.orders.map((item, index) => {
                const { date, time } = formatDateTime(item.timestamp);

                return (
                  <TableRow
                    key={index}
                    className="hover:bg-[#1b1f27]/70 transition-colors duration-150 ease-in-out border-b border-gray-800 last:border-0"
                  >
                    {/* Date & Time */}
                    <TableCell>
                      <p className="font-medium text-gray-100">{date}</p>
                      <p className="text-gray-500 text-xs">{time}</p>
                    </TableCell>

                    {/* Coin Info */}
                    <TableCell className="font-medium flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-gray-700 shadow-sm">
                        <AvatarImage src={item.orderItem.coin.image} />
                      </Avatar>
                      <span className="text-gray-100 font-semibold">{item.orderItem.coin.name}</span>
                    </TableCell>

                    {/* Prices */}
                    <TableCell className="text-gray-300">${item.orderItem.buyPrice}</TableCell>
                    <TableCell className="text-gray-300">${item.orderItem.sellPrice}</TableCell>

                    {/* Order Type Badge */}
                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold tracking-wide
                        ${item.orderType === "BUY"
                          ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/50"
                          : "bg-rose-900/40 text-rose-400 border border-rose-700/50"
                        }`}
                      >
                        {item.orderType}
                      </span>
                    </TableCell>

                    {/* Profit / Loss */}
                    <TableCell
                      className={`${
                        calculateProfit(item) >= 0 ? "text-emerald-400" : "text-rose-500"
                      } font-semibold`}
                    >
                      ${calculateProfit(item).toFixed(2)}
                    </TableCell>

                    {/* Value */}
                    <TableCell className="text-center font-semibold text-gray-100">
                      ${item.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan="7"
                  className="text-center py-10 text-gray-500 italic"
                >
                  No recent activity found...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Activity;
