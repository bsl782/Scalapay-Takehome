import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeleteProductDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'ID must be a valid integer' })
  @Min(1, { message: 'ID must be a positive number' })
  id: number;
}