import { SetMetadata } from '@nestjs/common';

/**
 * Decorador que asigna roles específicos a un método o controlador.
 * Esto permite restringir el acceso según los roles definidos.
 * 
 * @param roles - Lista de roles permitidos.
 */
export const Roles = (...roles: string[]): MethodDecorator => SetMetadata('roles', roles);
