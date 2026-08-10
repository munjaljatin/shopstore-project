import { Link } from "react-router-dom";
import { Pencil, Trash2, Package } from "lucide-react";
import { getImageUrl } from "../../utils/constants";

function ProductTable({ products, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="py-14 text-center">
        <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gray-50 flex items-center justify-center">
          <Package size={20} className="text-gray-400" />
        </div>

        <h2 className="text-sm font-semibold text-gray-900">
          No products found
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Start by adding your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Product
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Price
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Stock
            </th>

            <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition-colors"
            >
              {/* Product */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                    <img
                      src={getImageUrl(product.image_url)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate max-w-xs">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Product #{product.id}
                    </p>
                  </div>
                </div>
              </td>
              {/* Price */}
              <td className="px-5 py-4">
                <span className="font-medium text-gray-900">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>
              </td>
              {/* Stock */}
              <td className="px-5 py-4">
                {product.stock === 0 ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600">
                    Out of stock
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700">
                    {product.stock} left
                  </span>
                ) : (
                  <span className="text-gray-600">{product.stock} units</span>
                )}
              </td>
              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    to={`/dashboard/products/${product.id}/edit`}
                    className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit product"
                  >
                    <Pencil size={17} strokeWidth={1.8} />
                  </Link>

                  <button
                    onClick={() => onDelete(product)}
                    className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 size={17} strokeWidth={1.8} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
