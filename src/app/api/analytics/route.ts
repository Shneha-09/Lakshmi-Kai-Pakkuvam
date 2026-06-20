import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

const isDelivered = (status: string) =>
  status?.trim().toLowerCase() === "delivered";

const isPending = (status: string) =>
  status?.trim().toLowerCase() === "pending";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const allOrders = await Order.find({}).sort({ createdAt: -1 }).lean();

    const deliveredOnly = allOrders.filter((order) =>
      isDelivered(order.status)
    );

    const totalOrders = allOrders.length;

    const totalRevenue = deliveredOnly.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const pendingOrders = allOrders.filter((order) =>
      isPending(order.status)
    ).length;

    const deliveredOrders = deliveredOnly.length;

    const productSales: Record<
      string,
      { name: string; quantity: number; revenue: number }
    > = {};

    deliveredOnly.forEach((order: any) => {
      order.items?.forEach(
        (item: {
          productId: string;
          name: string;
          quantity: number;
          price: number;
        }) => {
          const id = item.productId || item.name;

          if (!productSales[id]) {
            productSales[id] = {
              name: item.name,
              quantity: 0,
              revenue: 0,
            };
          }

          productSales[id].quantity += Number(item.quantity || 0);
          productSales[id].revenue +=
            Number(item.price || 0) * Number(item.quantity || 0);
        }
      );
    });

    const bestSellers = Object.entries(productSales)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const monthlySales: Record<string, { revenue: number; orders: number }> =
      {};

    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      monthlySales[key] = { revenue: 0, orders: 0 };
    }

    deliveredOnly.forEach((order: any) => {
      const d = new Date(order.createdAt);
      const key = d.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      if (monthlySales[key]) {
        monthlySales[key].revenue += Number(order.total || 0);
        monthlySales[key].orders += 1;
      }
    });

    const monthlyData = Object.entries(monthlySales).map(([month, data]) => ({
      month,
      ...data,
    }));

    const categorySales: Record<string, number> = {};

    deliveredOnly.forEach((order: any) => {
      order.items?.forEach(
        (item: { category?: string; quantity: number; price: number }) => {
          const cat = item.category || "General";

          categorySales[cat] =
            (categorySales[cat] || 0) +
            Number(item.price || 0) * Number(item.quantity || 0);
        }
      );
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
    console.error("ANALYTICS_ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}