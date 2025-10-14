import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductsController } from "./products/products.controller";
import { ProductsModule } from "./products/products.module";
import { ProductsService } from "./products/products.service";

@Module({
	imports: [
		// Load .env file
		ConfigModule.forRoot({
			envFilePath: "../.env",
		}),
		// Connect to database
		SequelizeModule.forRoot({
			dialect: "mysql",
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			autoLoadModels: true,
			synchronize: true,
		}),
		// Import modules
		ProductsModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class AppModule {}
