import { ArrowUpDown } from "lucide-react";

function SortFilter({ sortBy, setSortBy }) {
  const options = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" },
    { label: "Name: A to Z", value: "nameAsc" },
    { label: "Name: Z to A", value: "nameDesc" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <ArrowUpDown className="text-blue-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Sort By</h2>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortFilter;
