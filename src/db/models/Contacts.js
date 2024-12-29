import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

contactsSchema.post('save', handleSaveError);

contactsSchema.pre('findOneAndUpdate', setUpdateSetting);

contactsSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType'];

const ContactCollection = model('contact', contactsSchema);

export default ContactCollection;
