import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import * as contactsController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsControllers));

contactsRouter.get('/:id', ctrlWrapper(contactsController.getContactsById));

contactsRouter.post('/', ctrlWrapper(contactsController.addContactsControlls));

contactsRouter.delete(
  '/:id',
  ctrlWrapper(contactsController.deleteContactsControlls),
);

contactsRouter.patch(
  '/:id',
  ctrlWrapper(contactsController.patchContactsControlls),
);

contactsRouter.put(
  '/:id',
  ctrlWrapper(contactsController.upsertContactsController),
);

export default contactsRouter;
