import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/state/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CoinInfo from "./CoinInfo";
import StockChart from "./StockChart";

const Home = () => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => page > 1 && setPage((prev) => prev - 1);

  useEffect(() => {
    if (category === "top50") dispatch(getTop50CoinList());
    else dispatch(getCoinList(page));
  }, [category, page, dispatch]);

  const currentCoinList = category === "all" ? coin.coinList : coin.top50;

  return (
    <div className="relative text-gray-200">
      <div className="lg:flex">
        <div className="lg:w-[60%] lg:border-r border-gray-700">
          <div className="p-3 flex items-center gap-4 border-b border-gray-700">
            <Button
              onClick={() => setCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full bg-slate-800 text-gray-200 border border-gray-600 hover:bg-slate-700"
            >
              All
            </Button>

            <Button
              onClick={() => setCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full bg-slate-800 text-gray-200 border border-gray-600 hover:bg-slate-700"
            >
              Top 50
            </Button>
          </div>

          <AssetTable coin={currentCoinList} category={category} />

          {category === "all" && (
            <div className="flex justify-center items-center py-4 border-t border-gray-700">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePrevPage}
                      className={`cursor-pointer ${
                        page === 1
                          ? "opacity-40 pointer-events-none"
                          : "hover:bg-slate-700"
                      }`}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 py-2 text-gray-300 border border-gray-700 rounded-md bg-slate-800">
                      Page {page}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className="cursor-pointer hover:bg-slate-700"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        <div className="hidden lg:block lg:w-[40%] p-5">
            <StockChart coinId="bitcoin" />
            <CoinInfo />
        </div>

      </div>
    </div>
  );
};

export default Home;
