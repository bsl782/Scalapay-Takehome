/**
 * Core Product entity interface
 */
export interface Product {
  id: number;
  productToken: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * API Error response interface
 */
export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  products: T[];
  productsCount: number;
  offset: number;
  limit: number;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  success: boolean;
}