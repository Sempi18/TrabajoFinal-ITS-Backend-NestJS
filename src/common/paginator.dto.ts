import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object (DTO) para manejar la paginación en las solicitudes.
 */
export class PaginatorDto {
  /**
   * Página actual de los resultados (opcional).
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  /**
   * Número de elementos por página (opcional).
   * @example 10
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  /**
   * Límite total de elementos a devolver (opcional).
   * @example 50
   */
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
