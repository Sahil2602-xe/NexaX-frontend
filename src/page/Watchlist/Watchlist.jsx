import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToWatchlist, getUserWatchlist } from '@/state/Watchlist/Action'

const Watchlist = () => {
  const watchlist = useSelector(store => store.watchlist);
  const dispatch = useDispatch();

  const handleRemoveFromWatchlist = (value) => {
    dispatch(
      addItemToWatchlist({
        coinId: value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="p-5 lg:px-20 text-gray-200">
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="font-bold text-3xl tracking-tight text-white">Watchlist</h1>
        <p className="text-gray-400 text-sm">
          Keep track of your favorite coins and market movements
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#0f1115]/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1a1d23]/80">
            <TableRow>
              <TableHead className="text-gray-300 font-semibold py-5">COINS</TableHead>
              <TableHead className="text-gray-300 font-semibold">Symbol</TableHead>
              <TableHead className="text-gray-300 font-semibold">Volume</TableHead>
              <TableHead className="text-gray-300 font-semibold">Market Cap</TableHead>
              <TableHead className="text-gray-300 font-semibold">24h</TableHead>
              <TableHead className="text-right text-gray-300 font-semibold">Price</TableHead>
              <TableHead className="text-right text-red-500 font-semibold">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlist?.coins?.length > 0 ? (
              watchlist.coins.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-[#1b1f27]/70 transition-colors duration-150 ease-in-out"
                >
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="border border-gray-700 shadow-sm">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span className="text-gray-100 font-semibold">{item.name}</span>
                  </TableCell>

                  <TableCell className="uppercase text-gray-400">
                    {item.symbol}
                  </TableCell>

                  <TableCell className="text-gray-300">
                    {item.total_volume.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-gray-300">
                    ${item.market_cap.toLocaleString()}
                  </TableCell>

                  <TableCell
                    className={`${
                      item.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-rose-500"
                    } font-medium`}
                  >
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>

                  <TableCell className="text-right text-gray-100 font-semibold">
                    ${item.current_price.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-[#2a2f39] text-red-400 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveFromWatchlist(item.id)}
                    >
                      <BookmarkFilledIcon className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="7"
                  className="text-center py-10 text-gray-500 italic"
                >
                  Your watchlist is empty or still loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Watchlist
