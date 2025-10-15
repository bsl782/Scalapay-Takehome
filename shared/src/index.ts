// Export all types
export * from './types/product.types';

// Export all DTOs
export * from './dto/product.dto';

// Re-export commonly used validation decorators for convenience
export { IsInt, IsNotEmpty, IsNumber, IsString, Min, IsOptional } from 'class-validator';
export { Transform } from 'class-transformer';