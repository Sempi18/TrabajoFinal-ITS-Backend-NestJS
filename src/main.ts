import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { envs } from './configuration';
import { HttpExceptionFilter } from './common';

async function bootstrap() {
  // Crear la aplicación NestJS a partir del módulo principal
  const app = await NestFactory.create(AppModule);
  
  // Instanciar el logger para registrar eventos
  const logger = new Logger('Main');

  // Aplicar globalmente el filtro para manejar excepciones HTTP
  app.useGlobalFilters(new HttpExceptionFilter());

  // Establecer un prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');

  // Configurar el uso global de pipes, incluyendo validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      // Solo permite propiedades definidas en el DTO, rechazando las no esperadas
      whitelist: true,
      // Si se reciben propiedades no esperadas, se rechaza la solicitud
      forbidNonWhitelisted: true,
    }),
  );

  // Iniciar el servidor en el puerto configurado
  await app.listen(envs.port);
  logger.log(`Servidor escuchando en el puerto: ${envs.port}`);
}

// Llamada a la función para arrancar la aplicación
bootstrap();
