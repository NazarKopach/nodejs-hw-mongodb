import createError from 'http-errors';

import * as ContactsServices from '../services/contacts-service.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import { sortByList } from '../db/models/Contacts.js';

export const getContactsControllers = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const data = await ContactsServices.getContacts({ page, perPage, sortBy, sortOrder });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsById = async (req, res) => {
  const { id } = req.params;
  const data = await ContactsServices.getContactsById(id);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactsControlls = async (req, res) => {
  const data = await ContactsServices.addContacts(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const deleteContactsControlls = async (req, res) => {
  const { id } = req.params;
  const data = await ContactsServices.deleteContacts({ _id: id });

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const patchContactsControlls = async (req, res) => {
  const { id } = req.params;
  const response = await ContactsServices.updateContacts(id, req.body);

  if (!response) throw createError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: response.data,
  });
};

export const upsertContactsController = async (req, res) => {
  const { id } = req.params;

  const { isNew, data } = await ContactsServices.updateContacts(id, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert movie',
    data,
  });
};
