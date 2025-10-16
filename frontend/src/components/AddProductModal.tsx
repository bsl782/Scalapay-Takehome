"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Product } from "@scalapay/shared";
import { useState } from "react";

export default function AddProductModal({ open, onClose, loading, onCreateProduct }: {
  open: boolean;
  onClose: (value: boolean) => void;
  loading: boolean;
  onCreateProduct: (product: Product) => void;
}) {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    productToken: "",
    price: 0,
    stock: 0,
  });

  const handleSaving = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct) {
      onCreateProduct({ ...newProduct } as Product);
      setNewProduct({
        name: "",
        productToken: "",
        price: 0,
        stock: 0,
      });
      onClose(false);
    }
  };

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
              <form onSubmit={handleSaving} >
                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left text-gray-700">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold "
                      >
                        Add New Product
                      </DialogTitle>
                      <div>
                        <span className="flex flex-row items-center gap-2">
                          <label className="text-sm mt-2">
                            Product Name:
                            <input name="name-input" type="text" defaultValue={newProduct?.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="mt-2 ml-1 border border-gray-300 rounded p-1" />
                          </label>
                        </span>
                        <span className="flex flex-row items-center gap-2">
                          <label className="text-sm mt-2">
                            Product Token:
                            <input type="text" defaultValue={newProduct?.productToken} onChange={(e) => setNewProduct({ ...newProduct, productToken: e.target.value })} className="mt-2 ml-1 border border-gray-300 rounded p-1" />
                          </label>
                        </span>
                        <span className="flex flex-row items-center gap-2">
                          <label className="text-sm mt-2">
                            Price:                           
                            <input type="number" defaultValue={newProduct?.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="mt-2 ml-1 border border-gray-300 rounded p-1" />
                          </label>
                        </span>
                        <span className="flex flex-row items-center gap-2">
                          <label className="text-sm mt-2">
                            Stock:                          
                            <input type="number" defaultValue={newProduct?.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} className="mt-2  ml-1 border border-gray-300 rounded p-1" />
                          </label>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
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
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog >
    </div >
  );
}
