import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class ListAllProductsDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: "Offset must be an integer" })
  @Min(0, { message: "Offset must be be greater than or equal to 0" })
  @IsOptional()
  offset: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: "Limit must be an integer" })
  @Min(0, { message: "Limit must be be greater than or equal to 0" })
  @IsOptional()
  limit: number;
}
