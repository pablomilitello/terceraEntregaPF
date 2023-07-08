import { __dirname } from './utils/utils.js';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de la API',
      version: '1.0.0',
    },
  },
  apis: [__dirname + '/docs/**/*.yaml'],
};

export const swaggerSetup = swaggerJSDoc(swaggerOptions);
