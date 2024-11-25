
# ITS - Proyecto Final - Backend 

## Autor: Lucas Duran

Este proyecto final de Backend es una API que permite gestionar usuarios y productos mediante operaciones HTTP con un CRUD completo.

## Requisitos

Tener instalados los siguientes programas:

   Node.js
   Git
   Un sistema gestor de bases de datos compatible.

---

## Pasos el funcionamiento la aplicación

1. ## Clonar el repositorio  
   Ejecuta en tu terminal:

   git clone https://github.com/Sempi18/TrabajoFinal-ITS-Backend-NestJS
   

2. ## Instalar las dependencias 
  Entra en el directorio del proyecto y ejecuta:

   npm install

3. ## Configurar las variables de entorno

   Crea un archivo .env basado en .env_template con la configuración de tu base de datos.  

4. ## Migrar la base de datos  
   Aplica las migraciones con:
   
   npx prisma migrate dev --name <NOMBRE_MIGRACION>

5. ## Iniciar la aplicación 
   Ejecuta el siguiente comando en modo desarrollo:
   
   npm run start:dev
   
---

## Uso de la aplicación

## 1. Crear un usuario
Realiza una solicitud POST para crear un nuevo usuario.

## 2. Hacer login
Usa el endpoint correspondiente para autenticarte con las credenciales.

## 3. Operaciones HTTP
Con el token de autenticación, puedes realizar las acciones disponibles según el rol de tu usuario.
