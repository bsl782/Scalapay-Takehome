import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";

describe("Products API (e2e)", () => {
  let app: INestApplication<App>;
  let createdProductId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("/products (POST)", () => {
    it("should create a new product", () => {
      return request(app.getHttpServer())
        .post("/products")
        .send({
          productToken: "TEST-E2E-001",
          name: "Test Product",
          price: 0.99,
          stock: 1,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty("id");
          expect(res.body.productToken).toBe("TEST-E2E-001");
          expect(res.body.name).toBe("Test Product");
          expect(res.body.price).toBe(0.99);
          expect(res.body.stock).toBe(1);
          expect(res.body).toHaveProperty("createdAt");
          expect(res.body).toHaveProperty("updatedAt");
          createdProductId = res.body.id;
        });
    });

    it("should return validation error for invalid data", () => {
      return request(app.getHttpServer())
        .post("/products")
        .send({
          productToken: "",
          name: "Test Product",
          price: -10,
          stock: "invalid",
        })
        .expect(400);
    });

    it("should return internal server error for non unique productToken", () => {
      return request(app.getHttpServer())
        .post("/products")
        .send({
          productToken: "TEST-E2E-001",
          name: "Test Product",
          price: 29.99,
          stock: 100,
        })
        .expect(500);
    });
  });

  describe("/products (GET)", () => {
    it("should return all products with default pagination", () => {
      return request(app.getHttpServer())
        .get("/products")
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.products)).toBe(true);
          expect(res.body.products.length).toBeGreaterThan(0);
        });
    });

    it("should return products with custom pagination", () => {
      return request(app.getHttpServer())
        .get("/products?offset=0&limit=1")
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.products)).toBe(true);
          expect(res.body.products.length).toBeLessThanOrEqual(1);
        });
    });

    it("should return validation error for invalid pagination", () => {
      return request(app.getHttpServer())
        .get("/products?offset=invalid&limit=-1")
        .expect(400);
    });
  });

  describe("/products (PATCH)", () => {
    it("should update product stock", () => {
      return request(app.getHttpServer())
        .patch("/products")
        .send({
          id: createdProductId,
          stock: 150,
        })
        .set("Content-Type", "application/json")
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdProductId);
          expect(res.body.stock).toBe(150);
        });
    });

    it("should return 404 for non-existent product", () => {
      return request(app.getHttpServer())
        .patch("/products")
        .send({
          id: 0,
          stock: 100,
        })
        .set("Content-Type", "application/json")
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe("Product not found");
        });
    });

    it("should return validation error for invalid data", () => {
      return request(app.getHttpServer())
        .patch("/products")
        .send({
          id: "invalid",
          stock: -10,
        })
        .set("Content-Type", "application/json")
        .expect(400);
    });
  });

  describe("/products/:id (DELETE)", () => {
    it("should delete a product", () => {
      return request(app.getHttpServer())
        .delete(`/products/${createdProductId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe("Product deleted");
        });
    });

    it("should return 404 for non-existent product", () => {
      return request(app.getHttpServer())
        .delete("/products/0")
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe("Product not found");
        });
    });

    it("should return validation error for invalid ID", () => {
      return request(app.getHttpServer())
        .delete("/products/invalid")
        .expect(400);
    });
  });
});
