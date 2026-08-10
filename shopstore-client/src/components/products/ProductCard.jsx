import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { formatCurrency } from "../../utils/constants";
import { getImageUrl } from "../../utils/constants";

function ProductCard({ product }) {
  return (
    <div className="bg-grey rounded-xl shadow-xl hover:shadow-3xl transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="h-62 bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={70} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-xl font-semibold truncate">{product.name}</h2>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-5">
          <span className="text-2xl font-semibold">
            {formatCurrency(product.price)}
          </span>
          <span
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} Left` : "Out of Stock"}
          </span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-5 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
