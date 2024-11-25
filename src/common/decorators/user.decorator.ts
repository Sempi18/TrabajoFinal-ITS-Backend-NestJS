import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador personalizado para obtener el usuario desde el contexto HTTP.
 * 
 * Este decorador extrae el objeto `user` del request, 
 * que normalmente es añadido por un guard o middleware como JWT Passport.
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Obtiene el objeto 'request' desde el contexto HTTP
    const request = ctx.switchToHttp().getRequest();
    // Retorna el usuario asociado al request
    return request.user;
  },
);
