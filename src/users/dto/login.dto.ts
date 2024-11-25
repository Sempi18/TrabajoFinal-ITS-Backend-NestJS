import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail() // Validación para asegurarse de que el email tenga el formato correcto
  email: string;

  @IsString() // Validación para asegurarse de que la contraseña sea una cadena de texto
  password: string;
}
