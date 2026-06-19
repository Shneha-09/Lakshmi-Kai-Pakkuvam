import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const [allOrders, totalRevenueResult] = await Promise.all([
      Order.find({}).lean(),
      Order.aggregate([
        { $match: { status: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
    ]);

    const totalOrders = allOrders.length;
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const pendingOrders = allOrders.filter((o) => o.status === "Pending").length;
    const deliveredOrders = allOrders.filter((o) => o.status === "Delivered").length;

    // Best selling products
    const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
    allOrders.forEach((order) => {
      if (order.status !== "Cancelled") {
        order.items.forEach((item: { productId: string; name: string; quantity: number; price: number }) => {
          if (!productSales[item.productId]) {
            productSales[item.productId] = { name: item.name, quantity: 0, revenue: 0 };
          }
          productSales[item.productId].quantity += item.quantity;
          productSales[item.productId].revenue += item.price * item.quantity;
        });
      }
    });

    const bestSellers = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Monthly sales (last 6 months)
    const monthlySales: Record<string, { revenue: number; orders: number }> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
      monthlySales[key] = { revenue: 0, orders: 0 };
    }

    allOrders.forEach((order) => {
      if (order.status !== "Cancelled") {
        const d = new Date(order.createdAt as Date);
        const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
        if (monthlySales[key]) {
          monthlySales[key].revenue += order.total;
          monthlySales[key].orders += 1;
        }
      }
    });

    const monthlyData = Object.entries(monthlySales).map(([month, data]) => ({ month, ...data }));

    // Category wise sales
    const categorySales: Record<string, number> = {};
    allOrders.forEach((order) => {
      if (order.status !== "Cancelled") {
        order.items.forEach((item: { name: string; quantity: number; price: number }) => {
          const cat = "General";
          categorySales[cat] = (categorySales[cat] || 0) + item.price * item.quantity;
        });
      }
    });

    const recentOrders = allOrders.slice(0, 5);

    return NextResponse.json({
      success: true,
      analytics: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        bestSellers,
        monthlyData,
        categorySales,
        recentOrders,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
