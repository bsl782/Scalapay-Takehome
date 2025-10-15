import {
  ApiError,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@scalapay/shared";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type getProductsResponse = {
  products: Product[];
  productCount: number;
};

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(
        Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message,
      );
    }

    return response.json();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return this.handleResponse<Product>(response);
  }

  async getProducts(offset = 0, limit = 10): Promise<getProductsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/products?offset=${offset}&limit=${limit}`,
    );
    return this.handleResponse<getProductsResponse>(response);
  }

  async updateProduct(updateData: UpdateProductDto): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    return this.handleResponse<Product>(response);
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
