import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Método que retorna un mensaje de saludo
  getHello(): string {
    return '¡Hola Mundo!';
  }
}
