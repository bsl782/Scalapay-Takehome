import { Product } from "@scalapay/shared";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "@/services/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);

  const createProduct = async (product: Product) => {
    setLoading(true);
    try {
      await apiService.createProduct(product);
      toast.success("Product created successfully");
      setOffset(0);
      await fetchProducts();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create product",
      );
    }
    setLoading(false);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts(offset, limit);
      setProducts(data?.products || []);
      setProductCount(data?.productCount || 0);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to fetch products",
      );
    }
    setLoading(false);
  }, [offset, limit]);

  const updateProduct = async (updatedProduct: Product) => {
    setLoading(true);
    try {
      await apiService.updateProduct({
        id: updatedProduct.id,
        stock: updatedProduct.stock,
      });
      toast.success("Product updated successfully");
      await fetchProducts();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update product",
      );
    }
    setLoading(false);
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await apiService.deleteProduct(id);
      toast.success("Product deleted successfully");
      if (products.length === 1 && offset > 0) {
        setOffset(offset - limit);
      }
      await fetchProducts();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product",
      );
    }
    setLoading(false);
  };

  const nextPage = async () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    await fetchProducts();
  };

  const prevPage = async () => {
    const newOffset = Math.max(0, offset - limit);
    console.log(newOffset);
    console.log(offset);
    setOffset(newOffset);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    offset,
    limit,
    nextPage,
    prevPage,
    hasNextPage: offset + limit < productCount,
    hasPrevPage: offset > 0,
    createProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
  };
};
