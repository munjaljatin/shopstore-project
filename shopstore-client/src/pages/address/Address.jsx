import { useEffect, useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  getAddresses,
  deleteAddress,
  setPrimaryAddress,
} from "../../api/address.api";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigat } from "react-router-dom";
import DeleteConfirmModal from "../../components/address/DeleteConfirmModal";

const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [deleteAddressId, setDeleteAddressId] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load your addresses.");
    } finally {
      setLoading(false);
    }
  };

  // getting the error: calling the setState synchronously within an effect can trigger the cascading renders
  // useEffect(() => {
  // fetchAddresses();
  // }, []);

  useEffect(() => {
    const loadAddresses = async () => {
      await fetchAddresses();
    };
    loadAddresses();
  }, []);

  const handleSetPrimary = async (id) => {
    try {
      setActionLoading(`primary-${id}`);
      await setPrimaryAddress(id);
      // Refresh the list so the primary badge/state
      // always reflects the backend.
      await fetchAddresses();
      toast.success("Primary address updated");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update primary address.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteAddressId) return;
    try {
      setActionLoading(`delete-${deleteAddressId}`);
      await deleteAddress(deleteAddressId);
      setAddresses((currentAddresses) =>
        currentAddresses.filter((address) => address.id !== deleteAddressId),
      );
      toast.success("Address deleted");

      // Close modal
      setDeleteAddressId(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete address.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-800">{error}</h2>
            <button
              onClick={fetchAddresses}
              className="mt-5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Addresses</h1>
          <p className="text-gray-500 mt-1">Manage your delivery addresses</p>
        </div>
        <Link to={"/address/new"}>
          <button className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition cursor-pointer">
            <Plus size={19} />
            Add New Address
          </button>
        </Link>
      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <MapPin className="text-blue-600" size={28} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-5">
            No addresses yet
          </h2>

          <p className="text-gray-500 mt-2">
            Add an address to make checkout faster.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition">
            <Plus size={18} />
            Add Your First Address
          </button>
        </div>
      )}

      {/* Address Cards */}
      {addresses.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {addresses.map((address) => {
            const isPrimary = address.is_primary;

            return (
              <div
                key={address.id}
                className={`relative bg-white rounded-2xl border p-5 transition ${
                  isPrimary
                    ? "border-blue-500 shadow-md border-dashed"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm border-dashed"
                }`}
              >
                {/* Primary Badge */}
                {isPrimary && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      <Check size={13} />
                      Primary
                    </span>
                  </div>
                )}

                {/* Address Type */}
                <div className="flex items-center gap-3 pr-20">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isPrimary ? "bg-blue-50" : "bg-gray-100"
                    }`}
                  >
                    <MapPin
                      size={19}
                      className={isPrimary ? "text-blue-600" : "text-gray-500"}
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {address.address_type}
                    </h2>

                    <p className="text-xs text-gray-500">{address.full_name}</p>
                  </div>
                </div>

                {/* Address Details */}
                <div className="mt-5 text-sm text-gray-600 leading-6 px-2 py-2">
                  <p>{address.full_name}</p>
                  <p>
                    <strong>Phone Number:</strong> {address.phone}
                  </p>
                  <p className="mt-2">{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.postal_code}, {address.country}
                  </p>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-100 mt-5 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    {!isPrimary ? (
                      <button
                        onClick={() => handleSetPrimary(address.id)}
                        disabled={actionLoading === `primary-${address.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition cursor-pointer"
                      >
                        {actionLoading === `primary-${address.id}` ? (
                          <span className="flex items-center gap-1.5">
                            <Loader2 size={15} className="animate-spin" />
                            Updating...
                          </span>
                        ) : (
                          "Set as Default"
                        )}
                      </button>
                    ) : (
                      <span className="text-sm text-green-600 font-medium">
                        Primary address
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`/address/${address.id}/edit`)}
                        className="p-2 rounded-lg cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="Edit address"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => setDeleteAddressId(address.id)}
                        disabled={actionLoading === `delete-${address.id}`}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:text-gray-300 transition cursor-pointer"
                        title="Delete address"
                      >
                        {actionLoading === `delete-${address.id}` ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : (
                          <Trash2 size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <DeleteConfirmModal
        isOpen={deleteAddressId !== null}
        onCancel={() => setDeleteAddressId(null)}
        onConfirm={handleDelete}
        loading={
          deleteAddressId !== null &&
          actionLoading === `delete-${deleteAddressId}`
        }
      />
    </section>
  );
};

export default Address;
