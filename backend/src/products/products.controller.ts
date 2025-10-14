/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import type { ProductsService } from "./products.service";

@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	readProducts(): string {
		return "List of products";
	}

	@Post()
	createProduct(): string {
		return "Product created";
	}

	@Put()
	updateProduct(): string {
		return "Product updated";
	}

	@Delete()
	deleteProduct(): string {
		return "Product deleted";
	}
}
