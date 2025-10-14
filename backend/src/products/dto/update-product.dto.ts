import { IsInt, Min } from "class-validator";

export class UpdateProductDto {
  @IsInt({ message: "Id must be an integer" })
  @Min(0, { message: "Id must be be greater than or equal to 0" })
  id: number;

  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock must be be greater than or equal to 0" })
  stock: number;
}
