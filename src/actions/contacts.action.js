import Contact from '../models/Contact';

export const ADD_CONTACT = 'ADD_CONTACT';

let counter = 0;

export function addContact(data)
{
  // C'est ici qu'on effectuera l'ajout d'un contact (appel REST)
  // et qu'on retournera un résultat (Success ou fail)
  counter += 1;
  return {
    type: ADD_CONTACT,
    newContact: new Contact(counter, data),
  };
}
