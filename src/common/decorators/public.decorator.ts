import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../../common';

/**
 * Decorador que marca un método de un controlador como público,
 * permitiendo el acceso sin autenticación.
 */
export const Public = (): MethodDecorator => SetMetadata(IS_PUBLIC_KEY, true);
