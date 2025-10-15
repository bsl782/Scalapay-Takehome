"use client";

import {
  AdjustmentsVerticalIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Product } from "@scalapay/shared";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  offset: number;
  limit: number;
  fetchProducts: () => void;
  onDelete: (id: number) => void;
  onUpdateProduct: (product: Product) => void;
  onCreateProduct: (product: Product) => void;
}

export default function ProductList({
  products,
  loading,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  offset,
  limit,
  fetchProducts,
  onDelete,
  onUpdateProduct,
  onCreateProduct
}: ProductListProps) {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const openAddModal = () => {
    setAddProductModalOpen(true);
  };

  return (
    <>
      <EditProductModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        loading={loading}
        onUpdateProduct={onUpdateProduct}
        editingProduct={editingProduct}
      />
      <AddProductModal
        open={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        loading={loading}
        onCreateProduct={onCreateProduct}
      />
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <div>
              <button
                type="button"
                onClick={fetchProducts}
                className="cursor-pointer px-2 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 mr-1"
              >
                <ArrowPathIcon className={`size-5`} />
              </button>
              <button
                type="button"
                onClick={openAddModal}
                className="cursor-pointer px-2 py-1 bg-green-400 text-white rounded-md hover:bg-green-500"
              >
                <PlusIcon className={`size-5`} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Showing {offset >= 0 && products.length > 0 ? offset + 1 : 0}-
            {Math.min(offset + limit, offset + products.length)} of products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.productToken}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Menu
                          menuButton={
                            <MenuButton className="text-gray-900 px-3 py-1 rounded-md cursor-pointer">
                              <AdjustmentsVerticalIcon className="size-5" />
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuItem onClick={() => openEditModal(product)}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => onDelete(product.id)}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={onPrevPage}
                disabled={!hasPrevPage || loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {Math.floor(offset / limit) + 1}
              </span>
              <button
                type="button"
                onClick={onNextPage}
                disabled={!hasNextPage || loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
