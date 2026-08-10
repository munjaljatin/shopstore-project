import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      change: "+8.2%",
      description: "from last month",
      icon: Package,
    },
    {
      title: "Total Orders",
      value: "128",
      change: "+12.5%",
      description: "from last month",
      icon: ShoppingBag,
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+18.4%",
      description: "from last month",
      icon: DollarSign,
    },
    {
      title: "Growth",
      value: "24.8%",
      change: "+4.6%",
      description: "from last month",
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1024",
      customer: "Rahul Sharma",
      product: "MacBook Air M3",
      amount: "$1,199",
      status: "Completed",
    },
    {
      id: "#ORD-1023",
      customer: "Aman Verma",
      product: "iPhone 15",
      amount: "$799",
      status: "Processing",
    },
    {
      id: "#ORD-1022",
      customer: "Priya Singh",
      product: "AirPods Pro",
      amount: "$249",
      status: "Completed",
    },
    {
      id: "#ORD-1021",
      customer: "Vikas Kumar",
      product: "Apple Watch",
      amount: "$399",
      status: "Pending",
    },
  ];

  const lowStockProducts = [
    {
      name: "AirPods Pro",
      stock: 3,
    },
    {
      name: "Samsung Galaxy S24",
      stock: 5,
    },
    {
      name: "Apple Watch Series 9",
      stock: 2,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-blue-600 font-medium mb-1">Overview</p>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <Link
          to="/dashboard/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={17} />
          Add Product
        </Link>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">
                  <Icon size={18} className="text-blue-600" strokeWidth={1.8} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs">
                <span className="flex items-center gap-0.5 text-green-600 font-medium">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>

                <span className="text-gray-400">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue Overview */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Revenue Overview
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Revenue performance over the last 7 months
              </p>
            </div>

            <select className="text-xs border border-gray-200 rounded-md px-2.5 py-2 text-gray-600 bg-white outline-none focus:border-blue-400">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          </div>

          {/* Simple Chart */}
          <div className="p-5">
            <div className="h-64 flex items-end gap-4 sm:gap-7">
              {[42, 58, 48, 72, 65, 86, 78].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col justify-end gap-2"
                >
                  <div
                    className="w-full max-w-12 mx-auto bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />

                  <span className="text-[11px] text-gray-400 text-center">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total revenue</p>

                <p className="text-lg font-semibold text-gray-900 mt-1">
                  $12,450
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <TrendingUp size={14} />
                18.4%
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Low Stock</h2>

              <p className="text-xs text-gray-500 mt-1">
                Products that need attention
              </p>
            </div>

            <AlertTriangle
              size={18}
              className="text-yellow-600"
              strokeWidth={1.8}
            />
          </div>

          <div className="p-5 space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Only {product.stock} units left
                  </p>
                </div>

                <span className="ml-3 shrink-0 px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs font-medium">
                  Low stock
                </span>
              </div>
            ))}

            <Link
              to="/dashboard/products"
              className="flex items-center justify-center gap-2 w-full pt-3 border-t border-gray-100 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View all products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Orders
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Latest orders from your store
            </p>
          </div>

          <Link
            to="/orders"
            className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Product
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>

                  <td className="px-5 py-4 text-gray-600">{order.customer}</td>

                  <td className="px-5 py-4 text-gray-600">{order.product}</td>

                  <td className="px-5 py-4 font-medium text-gray-900">
                    {order.amount}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-50 text-green-600"
                          : order.status === "Processing"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/dashboard/products/new"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <Plus size={19} className="text-blue-600" strokeWidth={1.8} />

              <ArrowRight
                size={15}
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
              />
            </div>

            <p className="text-sm font-medium text-gray-900 mt-4">
              Add Product
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Add a new product to your store
            </p>
          </Link>

          <Link
            to="/dashboard/products"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <Package size={19} className="text-blue-600" strokeWidth={1.8} />

              <ArrowRight
                size={15}
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
              />
            </div>

            <p className="text-sm font-medium text-gray-900 mt-4">
              Manage Products
            </p>

            <p className="text-xs text-gray-500 mt-1">
              View and manage your products
            </p>
          </Link>

          <Link
            to="/orders"
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <ShoppingBag
                size={19}
                className="text-blue-600"
                strokeWidth={1.8}
              />

              <ArrowRight
                size={15}
                className="text-gray-400 group-hover:text-blue-600 transition-colors"
              />
            </div>

            <p className="text-sm font-medium text-gray-900 mt-4">
              View Orders
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Track and manage customer orders
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
