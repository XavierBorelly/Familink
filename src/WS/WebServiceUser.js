import { appelGet, appelPost, appelPut } from './AppelWebService';
import { saveTokenToBDD, getTokenFromBDD } from '../BDD/Token';
import { tokenVide } from '../errors/Token';

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
  const body = JSON.stringify({
    phone,
  });

  appelPost('/public/forgot-password', body, null, null);
}

/** permet de modifier un utilisateur
 */
export async function editUser(name, firstName, email, profile, propsNavigation)
{
  getTokenFromBDD().then((token) =>
  {
    if (tokenVide(token, propsNavigation))
    {
      const body = JSON.stringify({
        lastName: name,
        firstName,
        email,
        profile,
      });

      appelPut('/secured/users', body, token, propsNavigation);
    }
  });
}
