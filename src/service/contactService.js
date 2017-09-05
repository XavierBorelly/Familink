import _ from 'lodash';

import Utils from '../Util';
import { checkMail } from '../errors/FamilinkErrors';
import { getAllContacts, saveContact, updateContact, deleteContact } from '../WS/WebServiceContact';
import Contact from '../models/Contact';

const GRAVATAR_BASE_URI = 'https://www.gravatar.com/avatar/';


export default class ContactService
{
  // Transforme l'objet JSON du serveur pour manipuler des objets Contact
  static mapToContactModel(obj)
  {
    // eslint-disable-next-line no-underscore-dangle
    return new Contact(obj._id, obj.phone, obj.firstName, obj.lastName, obj.email,
      obj.profile, obj.gravatar, obj.isFamilinkUser, obj.isEmergencyUser);
  }

  static getAllContacts()
  {
    return getAllContacts().then((contacts) =>
    {
      const mappedContacts = _.map(contacts, ContactService.mapToContactModel);
      return _.sortBy(mappedContacts, i => i.firstName.toLowerCase());
    });
  }

  static generateGravatarUrl(email)
  {
    const urlEmail = (checkMail(email) === '' ? email : '');
    return GRAVATAR_BASE_URI + Utils.MD5(urlEmail);
  }

  static async addContact(newContact)
  {
    const gravatarUrl = ContactService.generateGravatarUrl(newContact.email);

    const createResponse = await saveContact(newContact.phoneNumber, newContact.firstName,
      newContact.lastName, newContact.email, gravatarUrl);

    return {
      ok: createResponse.ok,
      data: createResponse.data,
    };
  }

  static async updateContact(newContact)
  {
    const gravatarUrl = ContactService.generateGravatarUrl(newContact.email);

    const updateResponse = await updateContact(newContact.phoneNumber, newContact.firstName,
      newContact.lastName, newContact.email, gravatarUrl, newContact.id);

    return {
      ok: updateResponse.ok,
      data: updateResponse.data,
    };
  }

  static async deleteContact(idContactDelete)
  {
    const deleteResponse = await deleteContact(idContactDelete);

    return {
      ok: deleteResponse.ok,
      data: deleteResponse.data,
    };
  }
}
