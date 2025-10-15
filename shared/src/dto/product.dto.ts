import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

/**
 * DTO for creating a new product
 */
export class CreateProductDto {
  @IsString({ message: "Product Token must be a string" })
  @IsNotEmpty({ message: "Product Token must not be empty" })
  productToken: string;

  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name must not be empty" })
  name: string;

  @IsNumber({}, { message: "Price must be a number" })
  @Min(0, { message: "Price must be greater than or equal to 0" })
  price: number;

  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock must be greater than or equal to 0" })
  stock: number;
}

/**
 * DTO for updating product stock
 */
export class UpdateProductDto {
  @IsInt({ message: "Id must be an integer" })
  @Min(0, { message: "Id must be greater than or equal to 0" })
  id: number;

  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock must be greater than or equal to 0" })
  stock: number;
}

/**
 * DTO for pagination and listing products
 */
export class ListAllProductsDto {
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt({ message: "Offset must be an integer" })
  @Min(0, { message: "Offset must be greater than or equal to 0" })
  offset: number = 0;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt({ message: "Limit must be an integer" })
  @Min(0, { message: "Limit must be greater than or equal to 0" })
  limit: number = 10;
}

/**
 * DTO for delete product parameter validation
 */
export class DeleteProductDto {
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt({ message: "ID must be a valid integer" })
  @Min(1, { message: "ID must be a positive number" })
  id: number;
}
