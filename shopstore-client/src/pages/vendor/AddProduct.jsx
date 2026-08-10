import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/vendor/ProductForm";
import { createProduct } from "../../api/vendor.api";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("DATA FROM FORM:", data);
      console.log("IMAGE FROM FORM:", data.image);
      console.log("IS FILE:", data.image instanceof File);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("stock", Number(data.stock));

      if (data.image) {
        formData.append("image", data.image);
      }

      // Debug
      console.log("IMAGE:", data.image);
      console.log("IS FILE:", data.image instanceof File);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await createProduct(formData);
      navigate("/dashboard/products");
    } catch (error) {
      console.error(error);
      alert("Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <ProductForm
        initialValues={{}}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default AddProduct;
