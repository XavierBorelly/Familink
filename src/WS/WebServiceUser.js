import { appelGet, appelPost, appelPut } from './AppelWebService';
import { saveTokenToBDD, getTokenFromBDD } from '../BDD/Token';
import { tokenIsFull } from '../errors/Token';
import { urlWs } from '../Util';

let propsNavigation = null;

export function setWebServiceNavigationUser(objNavigation)
{
  propsNavigation = objNavigation;
}

/** permet d'obtenir les différents profil d'utilisateur
 *
 * return : un tabeau de string avec la liste des profils
 */
export async function getProfil()
{
  return appelGet('/public/profiles', null, null);
}

/** permet d'obtenir le token d'authentification (et l'enregistre dans la base de donnée)
 */
export async function login(phone, password)
{
  const body = JSON.stringify({
    phone,
    password,
  });

  const messageAppelPost = appelPost('/public/login', body, null, null).then((response) =>
  {
    if (response.token !== undefined && response.token !== '' && response.token !== null)
    {
      saveTokenToBDD(response.token);
    }
    return (response.message);
  });
  return messageAppelPost;
}

/** permet d'enregistrer un nouveau utilisateur
 */
export async function saveUser(phone, password, name, firstName, email, profile)
{
  const body = JSON.stringify({
    phone,
    password,
    lastName: name,
    firstName,
    email,
    profile,
  });

  appelPost('/public/sign-in', body, null, null);
}

/** permet de faire une demande pour retrouver son password
 */
export async function forgotPassword(phone)
{
  const data = JSON.stringify({
    phone,
  });

  const lien = '/public/forgot-password';

  const response = await fetch(`${urlWs}${lien}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `${data}`,
  });

  return response.status;
}

/** permet de modifier un utilisateur
 */
export async function editUser(name, firstName, email, profile)
{
  const pickToken = getTokenFromBDD().then((token) =>
  {
    if (tokenIsFull(token, propsNavigation))
    {
      const body = JSON.stringify({
        lastName: name,
        firstName,
        email,
        profile,
      });

      const newBodyUser = appelPut('/secured/users', body, token, propsNavigation);
      return newBodyUser;
    }
    return '';
  });
  return pickToken;
}

export function getUser()
{
  const pickToken = getTokenFromBDD().then((token) =>
  {
    const bodyUser = appelGet('/secured/users/current', token, propsNavigation)
      .then((response) =>
      {
        const message = response;
        return message;
      });
    return bodyUser;
  });
  return pickToken;
}
