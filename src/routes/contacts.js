import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../utils/validateBody.js';

import { isValidId } from '../middlewares/isValidId.js';

import { contactsAddSchema, contactsUpdateSchema } from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/upload.js';

import * as contactsController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsControllers));

contactsRouter.get('/:id', isValidId, ctrlWrapper(contactsController.getContactsById));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsController.addContactsControlls),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(contactsController.deleteContactsControlls));

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactsController.patchContactsControlls),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsController.upsertContactsController),
);

export default contactsRouter;
