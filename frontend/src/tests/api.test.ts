import { Product } from "@scalapay/shared";
import { apiService } from "../services/api";

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

const mockProduct: Product = {
  id: 1,
  productToken: "TEST-PRODUCT-001",
  name: "Test Product",
  price: 99.99,
  stock: 10,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

const mockProducts: Product[] = [
  {
    id: 1,
    productToken: "TEST-PRODUCT-001",
    name: "Test Product",
    price: 99.99,
    stock: 10,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    productToken: "TEST-PRODUCT-002",
    name: "Another Test Product",
    price: 49.99,
    stock: 5,
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
];

const mockApiResponse = {
  products: mockProducts,
  productCount: 2,
};

// Mock fetch responses
const createMockFetch = (data: unknown, ok = true, status = 200) => {
  return jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => data,
  });
};

const createMockServerErrorFetch = (message: string, status: number) => {
  return jest.fn().mockRejectedValue(new Error(message));
};

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should fetch products successfully", async () => {
      mockFetch.mockImplementation(createMockFetch(mockApiResponse));

      const result = await apiService.getProducts(0, 10);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/products?offset=0&limit=10",
      );
      expect(result).toEqual(mockApiResponse);
    });

    it("should handle pagination parameters", async () => {
      mockFetch.mockImplementation(createMockFetch(mockApiResponse));

      await apiService.getProducts(20, 5);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/products?offset=20&limit=5",
      );
    });

    it("should handle API errors", async () => {
      const errorMessage = "Failed to fetch products";

      mockFetch.mockImplementation(
        createMockServerErrorFetch(errorMessage, 500),
      );

      await expect(apiService.getProducts()).rejects.toThrow(errorMessage);
    });
  });

  describe("createProduct", () => {
    const newProduct = {
      productToken: "NEW-PRODUCT-001",
      name: "New Product",
      price: 99.99,
      stock: 50,
    };

    it("should create a product successfully", async () => {
      mockFetch.mockImplementation(createMockFetch(mockProduct));

      const result = await apiService.createProduct(newProduct);

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      expect(result).toEqual(mockProduct);
    });

    it("should handle validation errors", async () => {
      const validationErrors = [
        "Product Token must not be empty",
        "Price must be greater than 0",
      ];

      const combinedMessage = validationErrors.join(", ");

      mockFetch.mockImplementation(
        createMockServerErrorFetch(combinedMessage, 400),
      );

      await expect(apiService.createProduct(newProduct)).rejects.toThrow(
        combinedMessage,
      );
    });
  });

  describe("updateProduct", () => {
    const updateData = { id: 1, stock: 25 };

    it("should update product successfully", async () => {
      const updatedProduct = { ...mockProduct, stock: 25 };
      mockFetch.mockImplementation(createMockFetch(updatedProduct));

      const result = await apiService.updateProduct(updateData);

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      expect(result).toEqual(updatedProduct);
    });

    it("should handle product not found error", async () => {
      const errorMessage = "Product not found";
      const errorResponse = {
        message: errorMessage,
        error: "Not Found",
        statusCode: 404,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue(errorResponse),
      } as any);

      await expect(apiService.updateProduct(updateData)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      mockFetch.mockImplementation(createMockFetch(undefined));

      await apiService.deleteProduct(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/products/1",
        {
          method: "DELETE",
        },
      );
    });

    it("should handle product not found error", async () => {
      const errorMessage = "Product not found";
      const errorResponse = {
        message: errorMessage,
        error: "Not Found",
        statusCode: 404,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue(errorResponse),
      } as any);

      await expect(apiService.deleteProduct(999)).rejects.toThrow(errorMessage);
    });
  });
});
