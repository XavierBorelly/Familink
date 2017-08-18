const url = 'https://familink.cleverapps.io';

/** permet d'obtenir les différents profil d'utilisateur
 *
 * return : un tabeau de string avec la liste des profils
 */
export async function getProfil()
{
  const response = await fetch(`${url}/public/profiles`);
  const responseJson = await response.json();
  return responseJson;
}

/** permet d'obtenir le token d'authentification (et l'enregistre dans la base de donnée)
 */
export async function login(phone, password)
{
  const response = await fetch(`${url}/public/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
      password,
    }),
  });

  const responseJson = await response.json();

  console.log(responseJson.token);
}

/** permet d'enregistrer un nouveau utilisateur
 */
export async function saveUser(phone, password, name, firstName, email, profile)
{
  fetch(`${url}/public/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
      password,
      lastName: name,
      firstName,
      email,
      profile,
    }),
  });
}

/** permet de faire une demande pour retrouver son password
 */
export async function forgotPassword(phone)
{
  fetch(`${url}/public/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
    }),
  });
}

/** permet de modifier un utilisateur
 */
/* export async function updateUser(phone, password, gravatar, name, firstname, email, profile)
{

} */

/** permet de recupérer la liste de tous les contacts
 *
 * return : un tabeau d'object avec la liste des conctacts trié par ordre alphabétique
 */
/* export async function getAllContacts()
{

} */

/** permet d'enregistrer un nouveau contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
/* export async function saveContact(title, gravatar, name, firstname, phoneNumber, email)
{

} */

/** permet de modifier un contact
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function updateContact(title, gravatar, name, firstname, phoneNumber, email)
{

}

/** permet de supprimer un contact
 */
/* export async function deleteContact()
{

} */
