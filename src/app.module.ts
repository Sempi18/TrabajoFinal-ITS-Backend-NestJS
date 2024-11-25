import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtGuard, GUARD_KEY } from './common';
import { ProductsModule } from './products/products.module';

@Module({
  // Importación de módulos necesarios para el funcionamiento de la aplicación
  imports: [
    PrismaModule, // Conexión y gestión de la base de datos
    UsersModule,  // Funcionalidades relacionadas con los usuarios
    ProductsModule, // Funcionalidades relacionadas con los productos
  ],
  // Controladores responsables de manejar las rutas de la API
  controllers: [AppController],
  // Proveedores de servicios y guardias para la aplicación
  providers: [
    AppService, // Servicio principal de la aplicación
    {
      provide: GUARD_KEY, // Proveedor del guardia JWT para proteger rutas
      useClass: JwtGuard, // Clase encargada de la validación del JWT
    },
  ],
})
export class AppModule {}
