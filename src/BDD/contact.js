import { AsyncStorage } from 'react-native';

const key = '@MyContacts:key';

/**
* permet de récupérer tous les contacts
*
* return tous les objects contacts sous forme d'une string encoder en Json
*/
export async function getAllContactsFromDBB()
{
  try
  {
    const contacts = await AsyncStorage.getItem(key);
    if (contacts !== null)
    {
      console.log('value de la BDD : ');
      console.log(JSON.parse(contacts));
      return Promise.resolve(JSON.parse(contacts));
    }
    console.log('BDD vide');
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

/**
* permet l'enregistrement de tous les conctacts
*/
export async function saveAllContactsToDBB(contacts)
{
  try
  {
    await AsyncStorage.setItem(key, JSON.stringify(contacts));
    console.log('BDD save');
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

/**
* permet l'enregistrement d'un conctact
*/
export async function saveContactToDBB(newContact)
{
  getAllContactsFromDBB().then((contacts) =>
  {
    contacts.push(newContact);
    console.log(contacts);
    console.log(`newContact : ${newContact.phoneNumber}  ajouter`);
    saveAllContactsToDBB(contacts);
  });
}

/**
* permet de supprimer tous les contacts
*/
export async function deleteAllContactsToDBB()
{
  try
  {
    await AsyncStorage.removeItem(key);
    console.log('BDD clean');
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

/**
* permet de supprimer un contact précis
*/
export async function deleteContactToDBB(phoneNumber)
{
  let i = 0;
  getAllContactsFromDBB().then((contacts) =>
  {
    for (i = 0; i < contacts.length; i += 1)
    {
      if (contacts[i].phoneNumber.indexOf(phoneNumber) > -1)
      {
        console.log(`contact ${contacts[i].phoneNumber} supprimer`);
        contacts.splice(i, 1);
        saveAllContactsToDBB(contacts);
        break;
      }
    }
  });
}

/**
* permet de modifier un concact
*/
export async function editContactToDBB(phoneNumber, contactEdit)
{
  let i = 0;
  getAllContactsFromDBB().then((contacts) =>
  {
    for (i = 0; i < contacts.length; i += 1)
    {
      if (contacts[i].phoneNumber.indexOf(phoneNumber) > -1)
      {
        console.log(`contact ${phoneNumber} modifier`);
        contacts[i] = contactEdit;
        saveAllContactsToDBB(contacts);
        break;
      }
    }
  });
}
