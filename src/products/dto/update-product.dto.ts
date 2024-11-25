import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para actualizar un producto.
 * Extiende de CreateProductDto para permitir la actualización parcial de los campos.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {
  /**
   * ID del producto.
   * Es opcional, debe ser un número positivo y se transforma a tipo `Number`.
   */
  @IsNumber() // Valida que sea un número
  @IsPositive() // Valida que el número sea positivo
  @IsOptional() // Hace que este campo sea opcional
  @Type(() => Number) // Transforma el valor a un número
  id?: number;
}
