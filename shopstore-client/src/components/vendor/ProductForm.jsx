import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const ProductForm = ({ initialValues, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    price: initialValues?.price || "",
    stock: initialValues?.stock || "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    initialValues?.image_url
      ? `http://localhost:3000${initialValues.image_url}`
      : "",
  );

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(
      initialValues?.image_url
        ? `http://localhost:3000${initialValues.image_url}`
        : "",
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      image,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>

        <p className="text-sm text-gray-500 mt-1">
          Add the basic information for your product.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Apple iPhone 16 Pro"
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm resize-none outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price
            </label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                ₹
              </span>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="999"
                min="0"
                className="w-full rounded-lg border border-gray-300 pl-8 pr-3.5 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="50"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product Image
          </label>

          <input
            id="product-image"
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="product-image"
            className="flex items-center gap-3 w-full px-4 py-4 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <ImagePlus className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">
                Choose an image
              </p>

              <p className="text-xs text-gray-400 mt-0.5">
                JPG, PNG or WEBP · Max 5MB
              </p>
            </div>
          </label>

          {/* Selected File */}
          {image && (
            <div className="flex items-center justify-between mt-3 px-3 py-2.5 rounded-lg border border-gray-200">
              <div className="min-w-0">
                <p className="text-sm text-gray-700 truncate">{image.name}</p>

                <p className="text-xs text-gray-400 mt-0.5">
                  {(image.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="ml-3 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={preview}
                alt="Product Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end px-6 py-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
