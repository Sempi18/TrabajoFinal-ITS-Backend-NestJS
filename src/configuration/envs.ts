// Importamos dependencias
import 'dotenv/config';
import * as joi from 'joi';

// Creamos una interfaz para mejorar el tipado de nuestro código
interface EnvVars {
  PORT: number;
  SECRET_KEY: string;
}

// Schema Joi para la configuración
const envsSchema = joi.object({
  PORT: joi.number().required(), // Indicamos que es obligatorio y de tipo número
  SECRET_KEY: joi.string().required(), // Indicamos que es obligatorio y de tipo cadena
}).unknown(true); // Permitimos propiedades no definidas en el esquema

// Validamos las variables de entorno y obtenemos el valor o el error
const { error, value } = envsSchema.validate(process.env);

// Si hay error, lanzamos una excepción con el mensaje de error
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Tipamos las variables de entorno usando la interfaz `EnvVars`
const envVars: EnvVars = value;

// Exportamos las variables de entorno
export const envs = {
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY, // Corregimos el nombre de la propiedad
};
