/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./interfaces/products.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async createProduct(data: Partial<Product>): Promise<Product> {
    return this.productModel.create(data);
  }

  async getAllProducts(offset: number, limit: number): Promise<Product[]> {
    return this.productModel.findAll({ offset, limit });
  }

  async updateProductStockById(id: number, stock: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException("Product not found, cannot update stock");
    }
    product.stock = stock;
    return product.save();
  }

  async deleteProductById(id: number): Promise<void> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException("Product not found, cannot delete");
    }
    await product.destroy();
  }
}
