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
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '@/state/Asset/Action'

const Portfolio = () => {
  const dispatch = useDispatch();
  const { asset } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUserAssets({ jwt: localStorage.getItem("jwt") }))
  }, [dispatch]);

  return (
    <div className="p-5 lg:px-20 text-gray-200">
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="font-bold text-3xl tracking-tight text-white">Portfolio</h1>
        <p className="text-gray-400 text-sm">
          Overview of your digital assets and their market performance
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#0f1115]/80 backdrop-blur-sm shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1a1d23]/80">
            <TableRow>
              <TableHead className="text-gray-300 font-semibold">ASSETS</TableHead>
              <TableHead className="text-gray-300 font-semibold">Symbol</TableHead>
              <TableHead className="text-gray-300 font-semibold">Quantity</TableHead>
              <TableHead className="text-gray-300 font-semibold">Change</TableHead>
              <TableHead className="text-gray-300 font-semibold">Change%</TableHead>
              <TableHead className="text-right text-gray-300 font-semibold">Volume</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {asset.userAssets?.length > 0 ? (
              asset.userAssets.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-[#1b1f27]/70 transition-colors duration-150 ease-in-out"
                >
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="border border-gray-700 shadow-sm">
                      <AvatarImage src={item.coin.image} />
                    </Avatar>
                    <span className="text-gray-100 font-semibold">{item.coin.name}</span>
                  </TableCell>

                  <TableCell className="uppercase text-gray-400">
                    {item.coin.symbol}
                  </TableCell>

                  <TableCell className="text-gray-300">{item.quantity}</TableCell>

                  <TableCell
                    className={`${
                      item.coin.price_change_24h >= 0
                        ? "text-emerald-400"
                        : "text-rose-500"
                    } font-medium`}
                  >
                    {item.coin.price_change_24h.toFixed(2)}
                  </TableCell>

                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-rose-500"
                    } font-medium`}
                  >
                    {item.coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>

                  <TableCell className="text-right text-gray-100 font-semibold">
                    ${item.coin.total_volume.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="6"
                  className="text-center py-10 text-gray-500 italic"
                >
                  No assets found in your portfolio
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Portfolio
