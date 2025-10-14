import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./interfaces/products.interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async createProduct(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productModel.findOne({
      where: { productToken: data.productToken },
    });
    if (existingProduct) {
      throw new InternalServerErrorException(
        "Product with the same token already exists",
      );
    }
    return this.productModel.create(data);
  }

  async getAllProducts(
    offset = 0,
    limit = 10,
  ): Promise<{ products: Product[]; productCount: number }> {
    const { rows, count } = await this.productModel.findAndCountAll({
      offset,
      limit,
    });
    return { products: rows, productCount: count };
  }

  async updateProductStockById(id: number, stock: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    product.stock = stock;
    return product.save();
  }

  async deleteProductById(id: number): Promise<void> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    await product.destroy();
  }
}
