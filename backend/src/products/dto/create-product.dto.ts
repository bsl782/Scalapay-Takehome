import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

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
