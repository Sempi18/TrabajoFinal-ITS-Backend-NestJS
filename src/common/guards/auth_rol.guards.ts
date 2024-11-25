import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRolGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // Utilizado para leer metadata de los decoradores
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuario inyectado en el request, generalmente por un guard previo

    // Verificar si el usuario está autenticado
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Leer los roles requeridos de la metadata del controlador o método
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // Si no hay roles especificados, permitir el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Comprobar si el usuario tiene alguno de los roles requeridos
    const userRoles = user.role || []; // Asume que el usuario tiene una propiedad "role" (puede ser un array)
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    // Lanzar una excepción si el usuario no tiene un rol válido
    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role to access this route');
    }

    // Permitir el acceso si pasa todas las verificaciones
    return true;
  }
}
