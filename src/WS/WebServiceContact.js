import { appelGet, appelPost, appelPut, appelDelete } from './AppelWebService';
import { getTokenFromBDD } from '../BDD/Token';
import { tokenIsFull } from '../errors/Token';

let propsNavigation = null;

export function setWebServiceNavigationContact(objNavigation)
{
  propsNavigation = objNavigation;
}


/** permet de recupérer la liste de tous les contacts
 *
 * return : un tabeau d'object avec la liste des conctacts trié par ordre alphabétique
 */
export async function getAllContacts()
{
  return getTokenFromBDD().then((token) =>
  {
    if (tokenIsFull(token, propsNavigation))
    {
      return appelGet('/secured/users/contacts', token, propsNavigation).then(response => response.data);
    }

    return '';
  });
}

/** permet d'enregistrer un nouveau contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function saveContact(phoneNumber, firstName, lastName, email, gravatar)
{
  return getTokenFromBDD().then((token) =>
  {
    if (tokenIsFull(token, propsNavigation))
    {
      const body = JSON.stringify({
        phone: phoneNumber,
        firstName,
        lastName,
        email,
        gravatar,
      });

      return appelPost('/secured/users/contacts', body, token, propsNavigation);
    }

    return null;
  });
}

/** permet de modifier un contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function updateContact(
  phoneNumber, firstName, lastName, email, gravatar, idContact)
{
  return getTokenFromBDD().then((token) =>
  {
    if (tokenIsFull(token, propsNavigation))
    {
      const body = JSON.stringify({
        phone: phoneNumber,
        firstName,
        lastName,
        email,
        gravatar,
      });

      return appelPut(`/secured/users/contacts/${idContact}`, body, token, propsNavigation);
    }

    return null;
  });
}

/** permet de supprimer un contact
 */
export async function deleteContact(idContact)
{
  return getTokenFromBDD().then((token) =>
  {
    if (tokenIsFull(token, propsNavigation))
    {
      return appelDelete(`/secured/users/contacts/${idContact}`, token, propsNavigation);
    }

    return null;
  });
}
