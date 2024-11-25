import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './keys/public.key';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super(); // Llama al constructor de la clase base
  }

  /**
   * Verifica si la ruta es pública o requiere autenticación.
   * Si es pública, permite el acceso directamente.
   * Si no, delega la autenticación a la estrategia JWT.
   * 
   * @param context - Contexto de ejecución de la solicitud actual.
   * @returns `true` si la ruta es pública o el usuario está autenticado.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica si la ruta o controlador tiene el decorador @Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true; // Permite el acceso si la ruta es pública
    }

    // Delegar la autenticación a la estrategia JWT
    return super.canActivate(context);
  }
}
