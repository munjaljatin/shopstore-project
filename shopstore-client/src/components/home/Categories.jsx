import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Laptops",
    icon: Laptop,
    slug: "laptops",
    description: "Powerful devices for work and creativity.",
  },
  {
    id: 2,
    name: "Smartphones",
    icon: Smartphone,
    slug: "smartphones",
    description: "Stay connected with the latest technology.",
  },
  {
    id: 3,
    name: "Accessories",
    icon: Headphones,
    slug: "accessories",
    description: "Essential accessories for your devices.",
  },
  {
    id: 4,
    name: "Smart Watches",
    icon: Watch,
    slug: "smart-watches",
    description: "Technology that keeps up with you.",
  },
];

const Categories = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-blue-600" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Collections
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore our collection of carefully selected technology and
              accessories.
            </p>
          </div>

          <Link
            to="/products"
            className="
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
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200/80
                  bg-white/70
                  p-6
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    transition-all
                    duration-300
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <Icon size={23} strokeWidth={1.6} />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-1.5
                    text-sm
                    font-medium
                    text-blue-600
                  "
                >
                  Explore
                  <ArrowUpRight
                    size={15}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
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
};

export default Categories;
