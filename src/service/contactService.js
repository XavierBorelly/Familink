import _ from 'lodash';

import Utils from '../Util';
import { checkMail } from '../errors/FamilinkErrors';
import { getAllContacts, saveContact, updateContact, deleteContact } from '../WS/WebServiceContact';

const GRAVATAR_BASE_URI = 'https://www.gravatar.com/avatar/';


export default class ContactService
{
  static getAllContacts()
  {
    return getAllContacts().then(contacts =>
      _.sortBy(contacts, i => i.firstName.toLowerCase()));
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
