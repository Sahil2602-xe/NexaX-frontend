import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Sidebar from "@/page/Navbar/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 py-3 border-b bg-background/60 backdrop-blur-md">

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11 hover:bg-accent hover:text-accent-foreground transition"
            >
              <DragHandleHorizontalIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 border-r-0 flex flex-col justify-start p-6">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center items-center gap-2 text-3xl font-bold">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/NexaX.png" alt="NexaX Logo" />
                    <AvatarFallback>NX</AvatarFallback>
                  </Avatar>
                  <span className="text-violet-700">NexaX</span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold cursor-pointer tracking-wide select-none"
        >
          NexaX
        </h1>
      </div>

      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search coins (e.g., bitcoin, eth)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-12 py-2 w-full border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-violet-600" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-violet-600 transition"
          onClick={() => navigate("/profile")}
        >
          <AvatarImage src={auth.user?.avatar || ""} alt={auth.user?.fullName || "User"} />
          <AvatarFallback>
            {auth.user?.fullName ? auth.user.fullName[0].toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
