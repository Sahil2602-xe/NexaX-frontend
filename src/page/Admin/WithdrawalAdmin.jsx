import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; 
import api from "@/config/api"; 

const WithdrawalAdmin = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/withdrawals", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      setWithdrawals(response.data || []);
      setFiltered(response.data || []);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      toast.error("Failed to fetch withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredList = withdrawals.filter(
      (item) =>
        item.user?.email.toLowerCase().includes(value) ||
        item.user?.fullName.toLowerCase().includes(value)
    );
    setFiltered(filteredList);
  };

  const handleAction = async (id, status) => {
    try {
      await api.patch(`/api/admin/withdrawals/${id}?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      toast.success(`Withdrawal ${status.toLowerCase()} successfully`);
      fetchWithdrawals();
    } catch (error) {
      console.error("Error updating withdrawal:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold">Withdrawal Requests</h1>
        <Input
          placeholder="Search by user name or email..."
          value={search}
          onChange={handleSearch}
          className="w-72"
        />
      </div>

      <div className="border rounded-md overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                  Loading withdrawal requests...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                  No withdrawal requests found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.user?.fullName || "—"}</TableCell>
                  <TableCell>{req.user?.email || "—"}</TableCell>
                  <TableCell>${req.amount}</TableCell>
                  <TableCell>
                    {req.date ? new Date(req.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.status === "APPROVED"
                          ? "success"
                          : req.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {req.status === "PENDING" ? (
                      <>
                        <Button
                          onClick={() => handleAction(req.id, "APPROVED")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleAction(req.id, "REJECTED")}
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">No action</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WithdrawalAdmin;
