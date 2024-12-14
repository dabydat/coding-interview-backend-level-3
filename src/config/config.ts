import dotenv from 'dotenv';
import Joi from 'joi';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Definir el esquema de validación para las variables de entorno
const envSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),

    HOST: Joi.string().default('localhost'),
    PORT: Joi.number().default(5001),
}).unknown();

// Validar las variables de entorno
const { error, value: envVars } = envSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

// Exportar la configuración validada
export const config = {
    db: {
        host: envVars.DB_HOST ,
        port: envVars.DB_PORT as number,
        username: envVars.DB_USERNAME,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_DATABASE,
    },
    local: {
        host: envVars.HOST,
        port: envVars.PORT as number,
    }
};
