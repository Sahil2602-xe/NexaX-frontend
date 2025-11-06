import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchCoin = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🚀 Automatically run search when coming from Navbar
  const initialQuery = searchParams.get("query");

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${q.trim()}`
      );
      setResults(response.data.coins || []);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSelectCoin = (id) => {
    navigate(`/market/${id}`);
  };

  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-2xl pb-5">Search Coins</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
        <Input
          type="text"
          placeholder="Search by name or symbol"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((coin) => (
            <div
              key={coin.id}
              onClick={() => handleSelectCoin(coin.id)}
              className="flex items-center gap-4 border border-gray-700 hover:border-violet-700 bg-background hover:bg-accent/10 p-4 rounded-xl cursor-pointer transition-all duration-200"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={coin.thumb || coin.image} />
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{coin.name}</p>
                <p className="text-sm text-gray-400">
                  {coin.symbol?.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-400 text-center mt-10">
            No coins found. Try searching for <b>“bitcoin”</b> or <b>“eth”</b>.
          </p>
        )
      )}
    </div>
  );
};

export default SearchCoin;
