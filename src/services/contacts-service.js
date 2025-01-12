import ContactCollection from '../db/models/Contacts.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const data = await ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments();

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactsById = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContacts = (payload) => ContactCollection.create(payload);

export const deleteContacts = (filter) => ContactCollection.findOneAndDelete(filter);

export const updateContacts = async (filter, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(filter, payload, {
    upsert,
    runValidators: true,
    new: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};
