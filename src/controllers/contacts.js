import createError from 'http-errors';
import * as ContactsServices from '../services/contacts-service.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contacts.js';
import { saveFileToUploadsDir } from '../utils/saveFileToUploadsDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsControllers = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);

  const data = await ContactsServices.getContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsById = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const data = await ContactsServices.getContact({ _id, userId });

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact`,
    data,
  });
};

export const addContactsControlls = async (req, res) => {
  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';

  let photo;
  if (req.file) {
    if (cloudinaryEnable) {
      photo = await saveFileToCloudinary(req.file);
    } else {
      photo = await saveFileToUploadsDir(req.file);
    }
  }

  const { _id: userId } = req.user;
  const data = await ContactsServices.addContacts({ ...req.body, photo, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const deleteContactsControlls = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await ContactsServices.deleteContacts({ _id, userId });

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const patchContactsControlls = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const response = await ContactsServices.updateContacts({ _id, userId }, req.body);

  if (!response) throw createError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: response.data,
  });
};

export const upsertContactsController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await ContactsServices.updateContacts(
    { _id: id },
    { ...req.body, userId },
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert movie',
    data,
  });
};
