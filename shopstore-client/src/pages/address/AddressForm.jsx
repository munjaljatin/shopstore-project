import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

import {
  createAddress,
  getAddressById,
  updateAddress,
} from "../../api/address.api";

const initialFormData = {
  addressType: "Home",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isPrimary: false,
};

const AddressForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * If URL contains an id:
   *
   * /addresses/15/edit
   *
   * then id = "15"
   *
   * Therefore we know we're editing.
   */
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(isEditMode);
  const addressTypes = ["Home", "Office", "Parents", "Others"];

  // ---------------------------------------
  // FETCH ADDRESS FOR EDIT
  // ---------------------------------------

  useEffect(() => {
    if (!isEditMode) {
      return;
    }
    const fetchAddress = async () => {
      try {
        setFetchingAddress(true);
        const response = await getAddressById(id);
        /*
         * If your backend returns:
         *
         * {
         *   message: "...",
         *   address: {...}
         * }
         *
         * then response.address is the actual address.
         */
        const address = response.address || response;
        setFormData({
          addressType: address.address_type || "Home",
          fullName: address.full_name || "",
          phone: address.phone || "",
          addressLine1: address.address_line1 || "",
          addressLine2: address.address_line2 || "",
          city: address.city || "",
          state: address.state || "",
          postalCode: address.postal_code || "",
          country: address.country || "India",
          isPrimary: address.is_primary || false,
        });
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Unable to load address");
        navigate("/address");
      } finally {
        setFetchingAddress(false);
      }
    };
    fetchAddress();
  }, [id, isEditMode, navigate]);

  // ---------------------------------------
  // HANDLE INPUT
  // ---------------------------------------

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------------------------------
  // HANDLE SUBMIT
  // ---------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        // PATCH /api/addresses/:id
        await updateAddress(id, formData);
        toast.success("Address updated successfully");
      } else {
        // POST /api/addresses
        await createAddress(formData);
        toast.success("Address added successfully");
      }
      navigate("/address");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to save address");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // LOADING EXISTING ADDRESS
  // ---------------------------------------

  if (fetchingAddress) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => navigate("/address")}
          className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Address" : "Add New Address"}
          </h1>

          <p className="text-gray-500 mt-1">
            {isEditMode
              ? "Update your delivery address"
              : "Add a new delivery address"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8"
      >
        {/* Address Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Type
          </label>

          <div className="flex gap-3">
            {addressTypes.map((type) => (
              <label
                key={type}
                className={`cursor-pointer px-5 py-3 rounded-xl border transition ${
                  formData.addressType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleChange}
                  className="hidden"
                />

                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Full Name + Phone */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1
          </label>

          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            placeholder="House number, street, area"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Address Line 2 */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2
          </label>

          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apartment, landmark, etc. (optional)"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* City + State */}
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter city"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="Enter state"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Postal + Country */}
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="Enter postal code"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Primary Address */}
        <label className="flex items-center gap-3 mt-6 cursor-pointer">
          <input
            type="checkbox"
            name="isPrimary"
            checked={formData.isPrimary}
            onChange={handleChange}
            className="w-4 h-4"
          />

          <span className="text-sm text-gray-700">
            Make this my primary address
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3.5 rounded-xl font-semibold transition"
        >
          <Save size={18} />

          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Address"
              : "Save Address"}
        </button>
      </form>
    </section>
  );
};

export default AddressForm;
