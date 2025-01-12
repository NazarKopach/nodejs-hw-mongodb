import { Router } from 'express';

import { validateBody } from '../utils/validateBody.js';

import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';

import * as authControllers from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRoutes.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginController),
);

authRoutes.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRoutes.post('/logout', ctrlWrapper(authControllers.logoutController));

export default authRoutes;
