import { appelGet, appelPost, appelPut } from './AppelWebService';
import { saveTokenToBDD, getTokenFromBDD } from '../BDD/Token';
import { tokenIsFull } from '../errors/Token';

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
  return appelGet('/public/profiles', null, null).then(response => response.data);
}

/** permet d'obtenir le token d'authentification (et l'enregistre dans la base de donnée)
 */
export async function login(phone, password)
{
  const body = JSON.stringify({
    phone,
    password,
  });

  const messageAppelPost = appelPost('/public/login', body).then((response) =>
  {
    const data = response.data;
    if (data.token !== undefined && data.token !== '' && data.token !== null)
    {
      saveTokenToBDD(data.token);
    }

    return (data.message);
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

  return appelPost('/public/sign-in', body, null, null);
}

/** permet de faire une demande pour retrouver son password
 */
export async function forgotPassword(phone)
{
  const body = JSON.stringify({
    phone,
  });

  return appelPost('/public/forgot-password', body, null, null).then(response => response.status);
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

      const newBodyUser = appelPut('/secured/users', body, token, propsNavigation).then(response => response.data);
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
        const message = response.data;
        return message;
      });
    return bodyUser;
  });
  return pickToken;
}
