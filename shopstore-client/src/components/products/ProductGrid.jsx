import ProductCard from "./ProductCard";

function ProductGrid({ products, columns = "four" }) {
  const columnClass =
    columns === "three"
      ? "w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.33px)]"
      : "w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.33px)] xl:w-[calc(25%-15px)]";

  return (
    <div className="flex flex-wrap gap-5">
      {products.map((product) => (
        <div key={product.id} className={columnClass}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
