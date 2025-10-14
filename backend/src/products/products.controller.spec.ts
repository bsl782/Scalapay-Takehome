import { Test, type TestingModule } from "@nestjs/testing";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { ListAllProductsDto } from "./dto/list-all-products-dto";
import type { Product } from "./interfaces/products.interface";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

describe("ProductsController", () => {
  let controller: ProductsController;
  let service: ProductsService;

  // Mocking the ProductsService since we are only testing the controller/services here
  const mockProductsService = {
    createProduct: jest.fn(),
    getAllProducts: jest.fn(),
    updateProductStockById: jest.fn(),
    deleteProductById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService, // Use mock instead of real service
        },
      ],
    }).compile();

    controller = app.get<ProductsController>(ProductsController);
    service = app.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  describe("createProduct", () => {
    it("should create a product", async () => {
      const createProductDto: CreateProductDto = {
        productToken: "PROD-001",
        name: "Test Product",
        price: 99.99,
        stock: 10,
      };

      const expectedResult = {
        id: 1,
        ...createProductDto,
      };

      // Mock the service method
      mockProductsService.createProduct.mockResolvedValue(
        expectedResult as Product,
      );

      const result = await controller.createProduct(createProductDto);

      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(expectedResult);
    });
  });
  describe("getAllProducts", () => {
    it("should return paginated products", async () => {
      const query: ListAllProductsDto = { offset: 0, limit: 10 };
      const expectedProducts = [
        {
          id: 1,
          productToken: "PROD-001",
          name: "Product 1",
          price: 99.99,
          stock: 10,
        },
        {
          id: 2,
          productToken: "PROD-002",
          name: "Product 2",
          price: 149.99,
          stock: 5,
        },
      ];

      mockProductsService.getAllProducts.mockResolvedValue(
        expectedProducts as Product[],
      );

      const result = await controller.getAllProducts(query);

      expect(service.getAllProducts).toHaveBeenCalledWith(
        query.offset,
        query.limit,
      );
      expect(result).toEqual(expectedProducts);
    });
  });
  describe("updateProduct", () => {
    it("should update product stock", async () => {
      const updateProductDto = { id: 1, stock: 20 };
      const updatedProduct = {
        id: 1,
        productToken: "PROD-001",
        name: "Test Product",
        price: 99.99,
        stock: 20,
      };

      mockProductsService.updateProductStockById.mockResolvedValue(
        updatedProduct as Product,
      );

      const result = await controller.updateProduct(updateProductDto);
      expect(service.updateProductStockById).toHaveBeenCalledWith(
        updateProductDto.id,
        updateProductDto.stock,
      );
      expect(result).toEqual(updatedProduct);
    });
  });
  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      const productId = 1;
      mockProductsService.deleteProductById.mockResolvedValue(undefined);

      const result = await controller.deleteProduct({id: productId});

      expect(service.deleteProductById).toHaveBeenCalledWith(productId);
      expect(result).toEqual({ message: "Product deleted" });
    });
  });
});
