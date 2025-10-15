import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    // Load .env file
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || "local"}`,
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
})
export class AppModule {}
