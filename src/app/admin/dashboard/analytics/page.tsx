"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAuthHeaders } from "@/hooks/useAdminAuth";

interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  bestSellers: { id: string; name: string; quantity: number; revenue: number }[];
  monthlyData: { month: string; revenue: number; orders: number }[];
  recentOrders: {
    _id: string;
    orderNumber: string;
    customer: { name: string };
    total: number;
    status: string;
    createdAt: string;
  }[];
}

const statCards = (data: AnalyticsData) => [
  {
    label: "Total Orders",
    value: data.totalOrders,
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Total Revenue",
    value: `₹${data.totalRevenue.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Pending Orders",
    value: data.pendingOrders,
    icon: Clock,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Delivered Orders",
    value: data.deliveredOrders,
    icon: CheckCircle2,
    color: "bg-maroon-700/10 text-maroon-700",
  },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics", { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.analytics);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <AdminSidebar>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-cream-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </AdminSidebar>
    );
  }

  const maxRevenue = Math.max(...data.monthlyData.map((m) => m.revenue), 1);

  return (
    <AdminSidebar>
      <div className="mb-6">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-brown-800">Sales Analytics</h1>
        <p className="text-brown-500 text-sm mt-1">Overview of your store performance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards(data).map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-5"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
              <card.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-brown-800">{card.value}</p>
            <p className="text-brown-500 text-xs mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly chart */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold text-brown-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-maroon-700" /> Monthly Sales (Last 6 Months)
          </h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {data.monthlyData.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-brown-700">₹{m.revenue}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 4)}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full bg-gradient-to-t from-maroon-700 to-maroon-500 rounded-t-lg min-h-[4px]"
                  style={{ maxHeight: "160px" }}
                />
                <span className="text-xs text-brown-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best sellers */}
        <div className="card p-6">
          <h3 className="font-semibold text-brown-800 mb-6">Best Selling Products</h3>
          {data.bestSellers.length === 0 ? (
            <p className="text-brown-400 text-sm">No sales data yet.</p>
          ) : (
            <div className="space-y-4">
              {data.bestSellers.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-500 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brown-800 truncate">{p.name}</p>
                    <p className="text-xs text-brown-400">{p.quantity} sold</p>
                  </div>
                  <span className="text-sm font-semibold text-brown-800">₹{p.revenue}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="card overflow-hidden overflow-x-auto">
        <div className="p-5 border-b border-cream-200">
          <h3 className="font-semibold text-brown-800">Recent Orders</h3>
        </div>
        <table className="w-full min-w-[500px]">
          <thead className="bg-cream-100">
            <tr className="text-left text-xs font-semibold text-brown-500 uppercase">
              <th className="px-5 py-3">Order #</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {data.recentOrders.map((order) => (
              <tr key={order._id} className="text-sm">
                <td className="px-5 py-3 font-medium text-brown-800">{order.orderNumber}</td>
                <td className="px-5 py-3 text-brown-600">{order.customer.name}</td>
                <td className="px-5 py-3 font-semibold text-brown-800">₹{order.total}</td>
                <td className="px-5 py-3">
                  <span className="badge bg-cream-200 text-brown-700">{order.status}</span>
                </td>
                <td className="px-5 py-3 text-brown-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.recentOrders.length === 0 && (
          <p className="text-center text-brown-400 py-10">No orders yet.</p>
        )}
      </div>
    </AdminSidebar>
  );
}
