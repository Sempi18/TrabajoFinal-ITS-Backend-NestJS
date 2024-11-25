import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6) // Contraseña debe tener al menos 6 caracteres
  @Transform(({ value }) => value.trim()) // Elimina espacios antes y después de la contraseña
  password: string;

  @IsOptional()
  @IsString()
  role?: string; // Rol opcional (admin, user, etc.)

  @IsOptional()
  @IsDate()
  deletedAt?: Date; // Fecha opcional para indicar si el usuario está eliminado
}
