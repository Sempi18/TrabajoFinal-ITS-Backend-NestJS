import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Product = createParamDecorator(
  // Extrae información específica del contexto HTTP
  (data: unknown, ctx: ExecutionContext) => {
    // Obtiene el objeto 'request' desde el contexto HTTP
    const request = ctx.switchToHttp().getRequest();
    // Devuelve la propiedad 'product' del request, configurada previamente
    return request.product;
  },
);
