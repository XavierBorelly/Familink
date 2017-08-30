import _ from 'lodash';

import Utils from '../Util';
import { checkMail } from '../errors/FamilinkErrors';
import { getAllContacts, saveContact } from '../WS/WebServiceContact';

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

    const saveResponse = await saveContact(newContact.phoneNumber, newContact.firstName,
      newContact.lastName, newContact.email, gravatarUrl);

    const saved = (saveResponse !== null);

    return {
      saved,
      newContact: (saved ? saveResponse : null),
    };
  }
}
