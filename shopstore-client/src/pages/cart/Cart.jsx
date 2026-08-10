import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Package,
} from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { getImageUrl } from "../../utils/constants";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();

  // ---------------- EMPTY CART ----------------
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5 py-12">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
            <ShoppingBag size={38} className="text-gray-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3 leading-6">
            Looks like you haven't added anything to your cart yet. Start
            shopping and find something you love.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-8 lg:py-12">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-1">
            Review your items before checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition"
        >
          <Trash2 size={17} />
          Clear Cart
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ================= CART ITEMS ================= */}

        <div className="space-y-4">
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}

                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    {getImageUrl(item.image_url) ? (
                      <img
                        src={getImageUrl(item.image_url)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={38} className="text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Information */}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="font-semibold text-gray-900 text-lg truncate">
                          {item.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          ₹{item.price.toLocaleString("en-IN")} per item
                        </p>
                      </div>

                      {/* Remove */}

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 text-gray-400 hover:text-red-500 transition"
                        title="Remove item"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>

                    {/* Bottom Row */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                      {/* Quantity */}

                      <div className="flex items-center border border-gray-200 rounded-lg w-fit overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-10 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock}
                          className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Item Total */}

                      <p className="font-bold text-gray-900">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Stock Information */}

                    <p className="text-xs text-gray-400 mt-3">
                      {item.stock} available
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= ORDER SUMMARY ================= */}

        <div className="lg:sticky lg:top-24">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            {/* Summary */}

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>

                <span className="font-medium text-gray-900">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>

                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Checkout */}

            <button
              type="button"
              className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            {/* Continue Shopping */}

            <Link
              to="/products"
              className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold transition"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

            {/* Security */}

            <p className="text-center text-xs text-gray-400 mt-5">
              Secure checkout · Your information is protected
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
