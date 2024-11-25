import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber() // Validación para asegurarse de que el campo es un número
  @IsPositive() // Validación para asegurarse de que el número es positivo
  @IsOptional() // El campo es opcional, no es obligatorio
  @Type(() => Number) // Convierte el valor a tipo número
  id?: number; // El ID es opcional, se utiliza para actualizar un usuario específico
}
