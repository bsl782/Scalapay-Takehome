# NestJS Products API - Usage Examples

This document provides usage examples on how to perform CRUD operations on the products API.

## Base URL
Unless stated otherwise in the environment variables this is the default URL
```
http://localhost:3000/products
```

## API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/products` | Create a new product |
| GET | `/products` | Get all products with pagination |
| PATCH | `/products` | Update product stock |
| DELETE | `/products/:id` | Delete a product by ID |

---

## 1. Create Product (POST /products)

### Request
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "productToken": "PROD-001",
    "name": "Wireless Headphones",
    "price": 99.99,
    "stock": 50
  }'
```

### Request Body Schema
```typescript
{
  productToken: string;  // Required, unique string
  name: string;          // Required, product name
  price: number;         // Required, must be >= 0
  stock: number;         // Required, integer >= 0
}
```

### Success Response (201 Created)
```json
{
  "id": 1,
  "productToken": "PROD-001",
  "name": "Wireless Headphones",
  "price": "99.99",
  "stock": 50,
  "createdAt": "2025-10-14T10:30:00.000Z",
  "updatedAt": "2025-10-14T10:30:00.000Z"
}
```

### Error Responses

#### Validation Error (400 Bad Request)
```json
{
  "message": [
    "Product Token must not be empty",
    "Price must be greater than or equal to 0"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### Duplicate Product Token (500 Internal Server Error)
```json
{
  "message": "Product with this token already exists",
  "error": "Conflict",
  "statusCode": 500
}
```

## 2. Get All Products (GET /products)

### Request
```bash
curl -X GET "http://localhost:3000/products"
```

### Query Parameters
```typescript
{
  offset?: number;  // Optional, default: 0
  limit?: number;   // Optional, default: 10
}
```

### Request Examples

#### Get the first 10 products (default state)
```bash
curl -X GET http://localhost:3000/products
```

#### Get the next 10 products 11-20 (pagination)
```bash
curl -X GET "http://localhost:3000/products?offset=10&limit=10"
```

### Success Response (200 OK)
```json
[
  {
    "id": 1,
    "productToken": "PROD-001",
    "name": "Wireless Headphones",
    "price": "99.99",
    "stock": 50,
    "createdAt": "2025-10-15T10:30:00.000Z",
    "updatedAt": "2025-10-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "productToken": "PROD-002",
    "name": "Bluetooth Speaker",
    "price": "149.99",
    "stock": 25,
    "createdAt": "2025-10-15T10:35:00.000Z",
    "updatedAt": "2025-10-15T10:35:00.000Z"
  }
]
```

### Error Response

#### Invalid Query Parameters (400 Bad Request)
```json
{
    "message": [
        "Offset must be be greater than or equal to 0",
        "Offset must be an integer"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

## 3. Update Product Stock (PATCH /products)

### Request
```bash
curl -X PATCH http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "stock": 75
  }'
```

### Request Body Schema
```typescript
{
  id: number;     // Required, integer >= 0
  stock: number;  // Required, integer >= 0
}
```

### Success Response (200 OK)
```json
{
  "id": 1,
  "productToken": "PROD-001",
  "name": "Wireless Headphones",
  "price": "99.99",
  "stock": 75,
  "createdAt": "2025-10-15T10:30:00.000Z",
  "updatedAt": "2025-10-15T11:15:00.000Z"
}
```

### Error Responses

#### Product Not Found (404 Not Found)
```json
{
  "message": "Product not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### Validation Error (400 Bad Request)
```json
{
  "message": [
    "Id must be an integer",
    "Stock must be greater than or equal to 0"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```
## 4. Delete Product (DELETE /products/:id)

### Request
```bash
curl -X DELETE http://localhost:3000/products/1
```

### URL Parameters
```typescript
{
  id: number;  // Required, integer >= 1, product ID
}
```

### Success Response (200 OK)
```json
{
  "message": "Product deleted"
}
```

### Error Responses

#### Product Not Found (404 Not Found)
```json
{
  "message": "Product not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### Invalid ID Parameter (400 Bad Request)
```json
{
  "message": [
    "ID must be a valid integer",
    "ID must be a positive number"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```