import { ListFilter } from "lucide-react";

const categories = [
  { name: "All", count: 124 },
  { name: "Laptops", count: 42 },
  { name: "Smartphones", count: 31 },
  { name: "Accessories", count: 27 },
  { name: "Smart Watches", count: 24 },
];

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <ListFilter className="text-blue-600" size={22} />
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.name}
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedCategory === category.name
                ? "bg-blue-50 border border-blue-500"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.name}
                onChange={() => onCategoryChange(category.name)}
                className="h-4 w-4 text-blue-600"
              />

              <span className="font-medium text-gray-700">{category.name}</span>
            </div>

            {/* <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
              {category.count}
            </span> */}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
