/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { ListAllProductsDto } from "./dto/list-all-products-dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Create a product
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  //Get all products with pagination
  @Get()
  async getAllProducts(@Query() query: ListAllProductsDto) {
    return this.productsService.getAllProducts(query.offset, query.limit);
  }

  //Update a product stock only (thus why PATCH usage)
  @Patch()
  async updateProduct(@Body() product: UpdateProductDto) {
    return this.productsService.updateProductStockById(
      product.id,
      product.stock,
    );
  }

  //Delete a product
  @Delete(":id")
  async deleteProduct(@Param() params: DeleteProductDto) {
    await this.productsService.deleteProductById(params.id);
    return { message: "Product deleted" };
  }
}
