import _ from 'lodash';

import { getAllContacts } from '../WS/WebServiceContact';

export default class ContactService
{
  static getAllContacts()
  {
    return getAllContacts().then(contacts =>
      _.sortBy(contacts, i => i.firstName.toLowerCase()));
  }
}
