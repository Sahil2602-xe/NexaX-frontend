import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const AssetTable = ({ coin = [], category, onCoinSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full border-t">
      <ScrollArea
        className={`${category === "all" ? "h-[77.3vh]" : "h-[82vh]"}`}
      >
        <Table className="w-full text-sm">
          {/* Header */}
          <TableHeader>
            <TableRow className="bg-muted/30 text-muted-foreground">
              <TableHead className="w-[160px] font-semibold">Coin</TableHead>
              <TableHead className="font-semibold">Symbol</TableHead>
              <TableHead className="font-semibold">Volume</TableHead>
              <TableHead className="font-semibold">Market Cap</TableHead>
              <TableHead className="font-semibold">24h</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {coin.length > 0 ? (
              coin.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    if (onCoinSelect) onCoinSelect(item);
                    else navigate(`/market/${item.id}`);
                  }}
                  className="cursor-pointer hover:bg-accent transition-all duration-200"
                >
                  {/* Coin name + logo */}
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span className="truncate max-w-[8rem]">{item.name}</span>
                  </TableCell>

                  {/* Symbol */}
                  <TableCell className="uppercase text-muted-foreground">
                    {item.symbol}
                  </TableCell>

                  {/* Volume */}
                  <TableCell className="text-muted-foreground">
                    {item.total_volume
                      ? item.total_volume.toLocaleString()
                      : "--"}
                  </TableCell>

                  {/* Market Cap */}
                  <TableCell className="text-muted-foreground">
                    {item.market_cap
                      ? `$${item.market_cap.toLocaleString()}`
                      : "--"}
                  </TableCell>

                  {/* 24h Change */}
                  <TableCell
                    className={`${
                      item.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } font-medium`}
                  >
                    {item.price_change_percentage_24h
                      ? item.price_change_percentage_24h.toFixed(2) + "%"
                      : "--"}
                  </TableCell>

                  {/* Current Price */}
                  <TableCell className="text-right font-semibold text-foreground">
                    ${item.current_price?.toLocaleString() || "--"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AssetTable;
