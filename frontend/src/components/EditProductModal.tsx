"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Product } from "@scalapay/shared";
import { useState } from "react";

export default function EditProductModal({ open, onClose, loading, editingProduct, onUpdateProduct }: {
  open: boolean;
  onClose: (value: boolean) => void;
  loading: boolean;
  editingProduct: Product | null;
  onUpdateProduct: (product: Product) => void;
}) {
  const [stock, setStock] = useState<number>(editingProduct?.stock || 0);

  const handleSaving = () => {
    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, stock });
      onClose(false);
    }
  };

  if (!editingProduct) return null;

  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden bg-white rounded-lg text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-gray-700">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold "
                    >
                      Edit Product
                    </DialogTitle>
                    <div>
                      <p className="text-sm mt-2">
                        Product: {editingProduct?.name}
                      </p>
                      <p className="text-sm mt-2">
                        Product Token: {editingProduct?.productToken}
                      </p>
                      <p className="text-sm mt-2">
                        Price: {editingProduct?.price}
                      </p>
                      <span className="flex flex-row items-center gap-2">
                        <p className="text-sm mt-2">
                          Stock:
                        </p>
                        <input type="number" defaultValue={editingProduct?.stock} onChange={(e) => setStock(Number(e.target.value))} className="mt-2 border border-gray-300 rounded p-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleSaving()}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => onClose(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mr-2"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
