import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Package,
  Star,
  ShoppingCart,
  CreditCard,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { getProductById } from "../../api/product.api";
import { createOrder } from "../../api/order.api";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getImageUrl } from "../../utils/constants";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Order states
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState("");
  const { addToCart } = useCart();

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ---------------- BUY NOW ----------------
  const handleBuyNow = async () => {
    if (!product || product.stock <= 0) {
      return;
    }

    try {
      setPlacingOrder(true);
      setOrderError("");
      const data = await createOrder({
        productId: product.id,
        quantity,
      });
      console.log("Order created:", data);
      // Update product stock locally
      setProduct((prevProduct) => ({
        ...prevProduct,
        stock: prevProduct.stock - quantity,
      }));

      // Reset quantity
      setQuantity(1);
      // Move to order page with actual backend order
      navigate("/order", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      console.error("Order error:", error);
      const message = "Unable to place order. Please Login to place orders.";
      setOrderError(message);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleAddToCart = () => {
    console.log("ADD TO CART CLICKED");
    // console.log("Product:", product);
    // console.log("Quantity:", quantity);

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!product || product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-200 h-130 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-7 w-24 bg-gray-200 rounded-full" />
            <div className="h-12 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
            <div className="h-14 w-44 bg-gray-200 rounded-lg" />
            <div className="h-14 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // ---------------- ERROR ----------------

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // ---------------- PRODUCT NOT FOUND ----------------

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ================= IMAGE ================= */}

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="relative bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden group">
            {/* Category */}

            <div className="absolute top-5 left-5 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {product.category || "General"}
              </span>
            </div>

            {/* Product Image */}
            {getImageUrl(product.image_url) ? (
              <img
                src={getImageUrl(product.image_url)}
                alt={product.name}
                className="w-full h-125 lg:h-140 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="h-125 lg:h-140 flex items-center justify-center">
                <Package size={90} className="text-gray-300" />
              </div>
            )}
          </div>

          {/* Benefits */}

          <div className="grid grid-cols-2 gap-4 mt-5">
            {/* Delivery */}
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
              <Truck size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-semibold">Fast Delivery</p>
                <p className="text-xs text-gray-500">Quick & reliable</p>
              </div>
            </div>

            {/* Security */}
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
              <ShieldCheck size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-semibold">Secure Purchase</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {product.category || "General"}
          </span>

          {/* Product Name */}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
              <Star size={17} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-800">4.6</span>
            </div>
            <span className="text-gray-500 text-sm">245 Reviews</span>
          </div>

          {/* Price */}
          <div className="mt-7">
            <span className="text-4xl lg:text-5xl font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Description */}
          <div className="mt-7">
            <p className="text-gray-600 leading-7 text-[15px]">
              {product.description}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-7" />

          {/* Stock */}
          <div>
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-green-700">
                  In Stock
                </span>
                <span className="text-sm text-gray-400">
                  · {product.stock} available
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span className="text-sm font-medium text-red-600">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* ================= ORDER SUCCESS ================= */}
          {orderSuccess && (
            <div className="mt-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              {orderSuccess}
            </div>
          )}

          {/* ================= ORDER ERROR ================= */}
          {orderError && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {orderError}
            </div>
          )}

          {/* ================= QUANTITY ================= */}
          {product.stock > 0 && (
            <div className="mt-7">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-gray-200 rounded-xl w-fit overflow-hidden bg-white">
                {/* Minus */}
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Minus size={17} />
                </button>

                {/* Quantity */}
                <span className="w-12 text-center font-semibold text-gray-900">
                  {quantity}
                </span>

                {/* Plus */}
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity === product.stock}
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>
          )}

          {/* ================= ACTIONS ================= */}
          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center justify-center gap-2 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={product.stock === 0 || placingOrder}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              <CreditCard size={20} />

              {placingOrder ? "Placing Order..." : "Buy Now"}
            </button>
          </div>

          {/* ================= VENDOR ================= */}
          <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Sold By
            </p>

            <div className="flex items-center justify-between mt-2">
              <p className="font-semibold text-gray-800">
                {product.vendor_name || "Marketplace Vendor"}
              </p>

              <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-500">
                Verified Seller
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
