const PriceFilter = ({ maxPrice, setMaxPrice }) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Price Range</h2>

      <input
        type="range"
        min={0}
        max={200000}
        step={1000}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full accent-blue-600"
      />

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>₹0</span>
        <span>₹2,00,000</span>
      </div>

      <div className="mt-5 bg-blue-50 rounded-lg p-3 text-center">
        <p className="text-sm text-gray-500">Maximum Price</p>

        <h3 className="text-2xl font-bold text-blue-600">
          ₹{maxPrice.toLocaleString("en-IN")}
        </h3>
      </div>
    </div>
  );
};

export default PriceFilter;
