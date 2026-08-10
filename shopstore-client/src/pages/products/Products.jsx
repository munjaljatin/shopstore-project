import { useEffect, useState, useCallback } from "react";
import { getProducts, searchProducts } from "../../api/product.api";
import ProductGrid from "../../components/products/ProductGrid";
import ProductSkeleton from "../../components/products/ProductSkeleton";
import EmptyProducts from "../../components/products/EmptyProducts";
import SearchBar from "../../components/products/SearchBar";
import CategoryFilter from "../../components/products/CategoryFilter";
import PriceFilter from "../../components/products/PriceFilter";
import SortFilter from "../../components/products/SortFilter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (search.trim()) {
        data = await searchProducts(search);
      } else {
        data = await getProducts(category, maxPrice, sortBy);
      }
      setProducts(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Unable to fetch products.");
    } finally {
      setLoading(false);
    }
  }, [search, category, maxPrice, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">
            Discover the latest electronics and accessories.
          </p>
        </div>

        {!loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-4xl font-semibold">
            {products.length} Products Found
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="space-y-6">
            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={setCategory}
            />
            <div>
              <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </div>

            <div>
              <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
        </aside>

        {/* Product Section */}
        <main className="col-span-12 lg:col-span-9">
          <SearchBar value={search} onChange={setSearch} />
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}
          {!loading && error && (
            <div className="flex justify-center py-20">
              <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
            </div>
          )}
          {!loading && !error && products.length === 0 && (
            <EmptyProducts search={search} />
          )}
          {!loading && !error && products.length > 0 && (
            <ProductGrid products={products} columns="three" />
          )}
        </main>
      </div>
    </section>
  );
};

export default Products;
