import { Test, type TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

describe("ProductsController", () => {
	let productController: ProductsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [ProductsService],
		}).compile();

		productController = app.get<ProductsController>(ProductsController);
	});

});
