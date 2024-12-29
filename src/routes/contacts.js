import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../utils/validateBody.js';

import { isValidId } from '../middlewares/isValidId.js';

import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

import * as contactsController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsControllers));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.getContactsById),
);

contactsRouter.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsController.addContactsControlls),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsController.deleteContactsControlls),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  // validateBody(contactsUpdateSchema),
  ctrlWrapper(contactsController.patchContactsControlls),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsController.upsertContactsController),
);

export default contactsRouter;
