"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API, { getUserId } from "@/lib/api";
import { useEffect, useState } from "react";

import { Wallet, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {

  // ✅ USER ID FROM TOKEN
  const userId = getUserId();

  // ✅ STATE
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]); // ✅ NEW

  // ✅ FETCH PORTFOLIO
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!userId) return;

        const res = await API.get(`/portfolio/${userId}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolio();
  }, [userId]);

  // ✅ FAKE REAL-TIME NOTIFICATIONS
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [
        `📢 New activity at ${new Date().toLocaleTimeString()}`,
        ...prev,
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // ✅ CALCULATE TOTAL VALUE
  const totalValue = portfolio.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ BUY STOCK
  const buyStock = async () => {
    try {
      if (!userId) {
        alert("User not found ❌");
        return;
      }

      await API.post("/portfolio/buy", {
        user_id: userId,
        stock: "AAPL",
        quantity: 2,
        price: 150,
      });

      alert("Stock purchased ✅");

      // ✅ REFRESH
      const res = await API.get(`/portfolio/${userId}`);
      setPortfolio(res.data);

      // ✅ ADD NOTIFICATION
      setNotifications((prev) => [
        "✅ Stock purchased successfully",
        ...prev,
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>

      {/* ✅ ✅ NOTIFICATION POPUP (TOP RIGHT) */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.slice(0, 3).map((msg, index) => (
          <div
            key={index}
            className="bg-white border border-[#E0E4E8] text-[#333] px-4 py-3 rounded-lg shadow-lg font-medium text-sm flex items-center"
          >
            <span className="mr-2">🔔</span> {msg}
          </div>
        ))}
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2C4869]">
            Dashboard
          </h1>
          <p className="text-[#64748b]">
            Welcome back! Here's your real portfolio.
          </p>
        </div>

        {/* ✅ CARDS */}
        <div className="grid gap-6 md:grid-cols-2">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }}>
            <Card className="bg-white border-[#E0E4E8] shadow-sm">
              <CardHeader className="flex justify-between">
                <CardTitle className="text-sm font-bold text-[#1D70B8]">
                  Total Portfolio Value
                </CardTitle>
                <Wallet className="h-4 w-4 text-[#1D70B8]" />
              </CardHeader>

              <CardContent>
                <div className="text-4xl font-bold text-[#333]">
                  ₹{totalValue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ✅ BUY BUTTON */}
          <motion.div animate={{ opacity: 1 }}>
            <Card className="bg-white border-[#E0E4E8] shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-[#1D70B8]">Quick Action</CardTitle>
              </CardHeader>

              <CardContent>
                <button
                  onClick={buyStock}
                  className="bg-[#1D70B8] hover:bg-[#155A96] text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Buy AAPL
                </button>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* ✅ PORTFOLIO TABLE */}
        <Card className="bg-white border-[#E0E4E8] shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1D70B8]">Your Holdings</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {portfolio.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ₹{item.price}
                    </TableCell>
                  </TableRow>
                ))}

                {portfolio.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      No stocks yet
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}