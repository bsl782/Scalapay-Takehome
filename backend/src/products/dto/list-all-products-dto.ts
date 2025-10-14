import { IsInt, Min } from "class-validator";

export class ListAllProductsDto {
  @IsInt({ message: "Offset must be an integer" })
  @Min(0, { message: "Offset must be be greater than or equal to 0" })
  offset: number;

  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be be greater than or equal to 1" })
  limit: number;
}
