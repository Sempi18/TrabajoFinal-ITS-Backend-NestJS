import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Inyecta AppService mediante el constructor
  constructor(private readonly appService: AppService) {}

  // Maneja la solicitud GET en la ruta raíz
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
