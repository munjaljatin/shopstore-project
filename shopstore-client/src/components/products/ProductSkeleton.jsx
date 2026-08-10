function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow overflow-hidden">
      <div className="h-52 bg-gray-300"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-6"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
