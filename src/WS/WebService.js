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
 *
 * phone(string), le login de l'utilisateur
 * password(string), le mot de passe de l'utilisateur
 */
export async function login(phone, password)
{
  const response = await fetch(`${url}/public/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });

  const responseJson = await response.json();

  console.log(responseJson.token);
}

/** permet d'enregistrer un nouveau utilisateur
 *
 * phone(string), le login de l'utilisateur
 * password(string), le mot de passe de l'utilisateur
 * name(string), le nom de l'utilisateur
 * firstname(string), le prénom de l'utilisateur
 * email (string), l'email de l'utilisateur
 * profile(string), le profil de l'utilisateur
 */
export async function saveUser(phone, password, name, firstName, email, profile)
{
  fetch(`${url}/public/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone,
      password: password,
      lastName: name,
      firstName: firstName,
      email: email,
      profile: profile,
    }),
  });
}

/** permet de faire une demande pour retrouver son password
 *
 * phone(string), le login de l'utilisateur
 */
export async function forgotPassword(phone)
{
  fetch(`${url}/public/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone,
    }),
  });
}

/** permet de modifier un utilisateur
 *
 * login(string), le login de l'utilisateur
 * password(string), le mot de passe de l'utilisateur
 * gravatar(string), le lien de l'image gravatar de l'utilisateur
 * name(string), le nom de l'utilisateur
 * firstname(string),  le prénom de l'utilisateur
 * email (string), l'email de l'utilisateur
 * profile(string), le profil de l'utilisateur
 */
export async function updateUser(login, password, gravatar, name, firstname, email, profile)
{

}

/** permet de recupérer la liste de tous les contacts
 *
 * return : un tabeau d'object avec la liste des conctacts trié par ordre alphabétique
 */
export async function getAllContacts()
{

}

/** permet d'enregistrer un nouveau contact
 *
 * title(string),  le titre du contact
 * gravatar(string) , le lien de l'image gravatar de l'utilisateur
 * name(string), le nom du contact
 * firstname (string), le prénom du contact
 * phoneNumber (int), le numéro du contact
 * email (string), l'email du contact
 * urgency(boolean), le fait que l'utilisateur soit ou non un contact d'urgence
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function saveContact(title, gravatar, name, firstname, phoneNumber, email)
{

}

/** permet de modifier un contact
 *
 * title(string),  le titre du contact
 * gravatar(string) , le lien de l'image gravatar de l'utilisateur
 * name(string), le nom du contact
 * firstname (string), le prénom du contact
 * phoneNumber (int), le numéro du contact
 * email (string), l'email du contact
 * urgency(boolean),
 *
 * return : l'object contact pour pouvoir l'utiliser immédiatement ou une erreur 401
 */
export async function updateContact(title, gravatar, name, firstname, phoneNumber, email)
{

}

/** permet de supprimer un contact
 */
export async function deleteContact()
{

}
