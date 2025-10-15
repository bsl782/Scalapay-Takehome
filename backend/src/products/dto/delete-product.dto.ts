import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeleteProductDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: "Id must be an integer" })
  @Min(0, { message: "Id must be be greater than or equal to 0" })
  id: number;
}