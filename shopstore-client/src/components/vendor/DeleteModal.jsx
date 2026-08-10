import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X, Loader2 } from "lucide-react";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  productName,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, loading, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={!loading ? onClose : undefined}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Delete Product
              </h2>

              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                disabled={loading}
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Body */}

            <div className="px-8 py-8 text-center">
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 250,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 0.5,
                  }}
                >
                  <Trash2 size={36} className="text-red-600" />
                </motion.div>
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900">
                Delete Product?
              </h3>

              <p className="mt-3 text-gray-600">
                You're about to permanently delete
              </p>

              <p className="mt-2 rounded-lg bg-gray-100 px-4 py-3 font-semibold text-gray-900 break-words">
                {productName}
              </p>

              <p className="mt-5 text-sm text-red-500">
                This action cannot be undone.
              </p>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                onClick={onClose}
                className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                disabled={loading}
                onClick={onConfirm}
                className="flex min-w-[130px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white shadow-lg transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
