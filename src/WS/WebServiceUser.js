import { appelGet, appelPost, appelPut } from './AppelWebService';
import { saveTokenToBDD, getTokenFromBDD } from '../BDD/Token';

/** permet d'obtenir les différents profil d'utilisateur
 *
 * return : un tabeau de string avec la liste des profils
 */
export async function getProfil()
{
  return appelGet('/public/profiles', null);
}

/** permet d'obtenir le token d'authentification (et l'enregistre dans la base de donnée)
 */
export async function login(phone, password)
{
  const body = JSON.stringify({
    phone,
    password,
  });

  appelPost('/public/login', body, null).then((response) =>
  {
    saveTokenToBDD(response.token);
  });
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
  appelPost('/public/sign-in', body, null);
}

/** permet de faire une demande pour retrouver son password
 */
export async function forgotPassword(phone)
{
  const body = JSON.stringify({
    phone,
  });

  appelPost('/public/forgot-password', body, null);
}

/** permet de modifier un utilisateur
 */
export async function editUser(name, firstName, email, profile)
{
  getTokenFromBDD().then((token) =>
  {
    const body = JSON.stringify({
      lastName: name,
      firstName,
      email,
      profile,
    });

    const structureToken = `Bearer ${token}`;
    appelPut('/secured/users', body, structureToken);
  });
}
