import { readFileSync } from 'node:fs';
import swaggerUiExpress from 'swagger-ui-express';
import { SWAGGER_PATH } from '../constants/index.js';
import createError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const docs = JSON.parse(readFileSync(SWAGGER_PATH, 'utf-8'));
    return [...swaggerUiExpress.serve, swaggerUiExpress.setup(docs)];
  } catch {
    return (req, res, next) => {
      next(createError(500, 'Cannot load docs'));
    };
  }
};
