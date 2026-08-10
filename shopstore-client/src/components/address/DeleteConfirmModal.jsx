import { AlertTriangle, Loader2, X } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  title = "Delete Address",
  message = "Are you sure you want to delete this address?",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-600" />
        </div>

        {/* Content */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <p className="mt-2 text-sm text-gray-500 leading-6">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:bg-red-400"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Address"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
