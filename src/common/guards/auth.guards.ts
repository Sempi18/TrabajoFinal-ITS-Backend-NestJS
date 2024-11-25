import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    // Verificar si el token existe
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      // Verificar el token usando la clave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN || 'secreto',
      });

      // Almacenar la información del usuario extraída del token en el objeto de solicitud
      request.user = payload;
    } catch (error) {
      // Lanzar una excepción si el token no es válido
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  /**
   * Extrae el token JWT desde el encabezado `Authorization`.
   * @param request - Objeto de solicitud HTTP.
   * @returns El token si está presente y tiene el formato correcto; de lo contrario, `undefined`.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization || '';
    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
