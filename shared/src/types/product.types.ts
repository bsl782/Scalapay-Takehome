
export interface Product {
  id: number;
  productToken: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}
