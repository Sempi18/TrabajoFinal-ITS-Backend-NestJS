import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PayloadInterface } from '../../common';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Crea un JSON Web Token (JWT) para autenticación.
   * @param user - El objeto de usuario que contiene el id y el email del usuario.
   * @returns Un string representando el JWT.
   */
  createJWT(user: UpdateUserDto): string {
    const { id: sub, email } = user || {}; // Desestructuramos el objeto de usuario
    const payload: PayloadInterface = { sub, email };

    return this.jwtService.sign(payload);
  }

  /**
   * Verifica y decodifica un JWT para autenticación.
   * @param token - El token JWT a verificar y decodificar.
   * @returns El payload decodificado que contiene el id y el email del usuario.
   */
  checkJWT(token: string): PayloadInterface {
    return this.jwtService.verify(token); // Verificamos y decodificamos el token
  }

  /**
   * Encripta una contraseña en texto plano utilizando bcrypt.
   * @param password - La contraseña en texto plano a encriptar.
   * @returns Una promesa que resuelve la contraseña encriptada.
   */
  hashPassword(password: string): Promise<string> {
    const saltOrRounds = 12; // Número de rondas para generar la sal
    return bcrypt.hash(password, saltOrRounds); // Encriptamos la contraseña
  }

  /**
   * Compara una contraseña en texto plano con una contraseña encriptada.
   * @param password - La contraseña en texto plano a comparar.
   * @param hashPassword - La contraseña encriptada para comparar.
   * @returns Una promesa que resuelve a `true` si las contraseñas coinciden, `false` de lo contrario.
   */
  passwordCompare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword); // Comparamos las contraseñas
  }
}
