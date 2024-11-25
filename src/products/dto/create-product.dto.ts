import { IsDate, IsNotEmpty, IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO para la creación de un producto.
 */
export class CreateProductDto {
  /**
   * Nombre del producto.
   * Requiere que sea una cadena de texto y no esté vacío.
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * Descripción del producto.
   * Se requiere que sea una cadena de texto.
   */
  @IsString()
  description: string;

  /**
   * Precio del producto.
   * Requiere que sea un número positivo, se transforma a tipo float.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // Verifica que el precio sea positivo
  @Transform(({ value }) => parseFloat(value)) // Convierte el valor a número flotante
  price: number;

  /**
   * Cantidad del producto.
   * Requiere que sea un número entero positivo, se transforma a entero.
   */
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() // Verifica que la cantidad sea positiva
  @Transform(({ value }) => parseInt(value, 10)) // Convierte el valor a número entero
  quantity: number;

  /**
   * Fecha de eliminación del producto (opcional).
   * Si no se proporciona, el valor será undefined.
   */
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
