import { PackageSearch } from "lucide-react";

function EmptyProducts({ search }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <PackageSearch size={70} className="text-gray-400 mb-4" />

      <h2 className="text-3xl font-bold">No Products Found</h2>

      {search ? (
        <p className="text-gray-500 mt-2">
          No products found matching
          <span className="font-semibold"> "{search}"</span>
        </p>
      ) : (
        <p className="text-gray-500 mt-2">
          There are currently no products available.
        </p>
      )}
    </div>
  );
}

export default EmptyProducts;
