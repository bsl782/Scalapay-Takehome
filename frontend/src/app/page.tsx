"use client";

import { ToastContainer } from "react-toastify";
import ProductList from "@/components/ProductList";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const {
    products,
    loading,
    offset,
    limit,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    fetchProducts,
    deleteProduct,
    updateProduct,
    createProduct,
  } = useProducts();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ecommerce Product Management
          </h1>
        </div>
        <ProductList
          products={products}
          loading={loading}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          offset={offset}
          limit={limit}
          fetchProducts={fetchProducts}
          onDelete={deleteProduct}
          onUpdateProduct={updateProduct}
          onCreateProduct={createProduct}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
