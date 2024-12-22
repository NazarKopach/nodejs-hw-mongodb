import ContactCollection from '../db/models/Contacts.js';

export const getContacts = () => ContactCollection.find();

export const getContactsById = (id) => ContactCollection.findById(id);

export const addContacts = (payload) => ContactCollection.create(payload);

export const deleteContacts = (filter) =>
  ContactCollection.findOneAndDelete(filter);

export const updateContacts = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};
