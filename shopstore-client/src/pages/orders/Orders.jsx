import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from "lucide-react";

const Order = () => {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
            <Package size={30} className="text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-5">
            Order Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find the order information.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-5 py-12">
      {/* Success */}

      <div className="text-center">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-50 rounded-full">
          <CheckCircle2 size={34} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mt-5">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-2">Your order has been confirmed.</p>
      </div>

      {/* Order Card */}

      <div className="mt-10 bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header */}

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Order ID
            </p>

            <p className="text-lg font-bold text-gray-900 mt-1">#{order.id}</p>
          </div>

          <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
            Confirmed
          </span>
        </div>

        {/* Order Information */}

        <div className="p-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Product */}

            <div>
              <p className="text-sm text-gray-400">Product</p>

              <p className="font-semibold text-gray-900 mt-1">
                #{order.product_id}
              </p>
            </div>

            {/* Quantity */}

            <div>
              <p className="text-sm text-gray-400">Quantity</p>

              <p className="font-semibold text-gray-900 mt-1">
                {order.quantity}
              </p>
            </div>

            {/* Price */}

            <div>
              <p className="text-sm text-gray-400">Total Amount</p>

              <p className="font-bold text-blue-600 mt-1">
                ₹{Number(order.total_amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Price Summary */}

        <div className="border-t border-gray-100 px-6 py-5">
          <div className="flex justify-between">
            <span className="text-gray-500">Price</span>

            <span className="font-medium">
              ₹{Number(order.price).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="font-semibold">Total</span>

            <span className="text-xl font-bold">
              ₹{Number(order.total_amount).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
        <Link
          to="/products"
          className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold text-gray-700 transition"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          My Orders
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Order;
