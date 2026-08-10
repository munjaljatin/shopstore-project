import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getMyProducts, deleteProduct } from "../../api/vendor.api";
import ProductTable from "../../components/vendor/ProductTable";
import DeleteModal from "../../components/vendor/DeleteModal";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getMyProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeleteLoading(true);

      await deleteProduct(selectedProduct.id);

      setShowDeleteModal(false);
      setSelectedProduct(null);

      await fetchProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 w-40 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-56 bg-gray-100 rounded mt-2 animate-pulse" />
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-12 bg-gray-50 animate-pulse" />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 border-t border-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage products listed in your store
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Package size={17} />
          <span>
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <ProductTable products={products} onDelete={handleDeleteClick} />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          if (!deleteLoading) {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        productName={selectedProduct?.name}
      />
    </div>
  );
}

export default MyProducts;
