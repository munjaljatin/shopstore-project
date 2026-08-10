import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProducts, getProducts } from "../../api/product.api";
import ProductGrid from "../products/ProductGrid";
import ProductSkeleton from "../products/ProductSkeleton";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        let data;
        try {
          data = await getFeaturedProducts();
        } catch {
          data = await getProducts();
          data = data.slice(0, 8);
        }
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-blue-600" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Featured
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Popular Products
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover products selected for quality, performance, and everyday
              value.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            to="/products"
            className="
              group
              hidden
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition-colors
              hover:text-blue-600
              sm:inline-flex
            "
          >
            View all products
            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="
              rounded-2xl
              border
              border-red-100
              bg-red-50/60
              py-14
              text-center
            "
          >
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <div className="">
            <ProductGrid products={products} />
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              py-16
              text-center
            "
          >
            <p className="text-sm text-gray-500">
              No featured products available.
            </p>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-9 flex justify-center sm:hidden">
          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-blue-600
            "
          >
            View all products
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
