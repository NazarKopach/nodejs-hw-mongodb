import Joi from 'joi';

import { emailRegexps } from '../constants/users.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexps).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexps).required(),
  password: Joi.string().min(6).required(),
});
