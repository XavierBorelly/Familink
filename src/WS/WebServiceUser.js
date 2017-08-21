import { appelGet, appelPost } from './AppelWebService';

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

  const response = appelPost('/public/login', body);

  console.log(response.token);
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

  appelPost('/public/sign-in', body);
}

/** permet de faire une demande pour retrouver son password
 */
export async function forgotPassword(phone)
{
  const body = JSON.stringify({
    phone,
  });

  appelPost('/public/forgot-password', body);
}
