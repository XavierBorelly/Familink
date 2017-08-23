import { appelGet, appelPost, appelPut, appelDelete } from './AppelWebService';
import { getTokenFromBDD } from '../BDD/Token';
import { tokenVide } from '../errors/Token';

/** permet de recupérer la liste de tous les contacts
 *
 * return : un tabeau d'object avec la liste des conctacts trié par ordre alphabétique
 */
export async function getAllContacts(propsNavigation)
{
  return getTokenFromBDD().then((token) =>
  {
    if (tokenVide(token, propsNavigation))
    {
      return appelGet('/secured/users/contacts', token, propsNavigation);
    }
  });
}

/** permet d'enregistrer un nouveau contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function saveContact(phoneNumber, firstName, lastName, email, gravatar, propsNavigation)
{
  getTokenFromBDD().then((token) =>
  {
    if (tokenVide(token, propsNavigation))
    {
      const body = JSON.stringify({
        phone : phoneNumber,
        firstName,
        lastName,
        email,
        gravatar,
      });

      appelPost('/secured/users/contacts', body, token, propsNavigation);
    }
  });
}

/** permet de modifier un contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function updateContact(phoneNumber, firstName, lastName, email, gravatar, idContact, propsNavigation)
{
  getTokenFromBDD().then((token) =>
  {
    if (tokenVide(token, propsNavigation))
    {
      const body = JSON.stringify({
        phone : phoneNumber,
        firstName,
        lastName,
        email,
        gravatar,
      });

      appelPut(`/secured/users/contacts/${idContact}`, body, token, propsNavigation);
    }
  });
}

/** permet de supprimer un contact
 */
export async function deleteContact(idContact, propsNavigation)
{
  getTokenFromBDD().then((token) =>
  {
    if (tokenVide(token, propsNavigation))
    {
      appelDelete(`/secured/users/contacts/${idContact}`, token, propsNavigation);
    }
  });
}
