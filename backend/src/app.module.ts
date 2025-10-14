import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductsController } from "./products/products.controller";
import { ProductsModule } from "./products/products.module";
import { ProductsService } from "./products/products.service";

@Module({
	imports: [ProductsModule, SequelizeModule.forRoot({
		dialect: "mysql",
		host: "localhost",
		port: 3306,
		username: "user",
		password: "password",
		database: "ecommerce",
		autoLoadModels: true,
		synchronize: true,
	})],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class AppModule {}
