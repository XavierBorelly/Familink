import
{
  AsyncStorage
} from 'react-native';

/**
 * permet l'enregistrement d'un conctact
 *
 * param newContactJson = l'object contact sous forme d'une string encoder en Json
 */
export async function saveContactToDBB(newContactJson)
{
  try
  {
    AsyncStorage.mergeItem('@MyContacts:key', JSON.stringify(newContactJson));
  }
  catch (error)
  {
    console.log(error);
  }
}

/**
 * permet de récupérer tous les contacts
 *
 * return tous les objects contacts sous forme d'une string encoder en Json
 */
export async function getAllContactsFromDBB()
{
  try
  {
    const value = await AsyncStorage.getItem('@MyContacts:key');
    if (value !== null)
    {
      console.log('value de la BDD : ');
      console.log(JSON.parse(value));
      return Promise.resolve(JSON.parse(value));
    }
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

/**
 * permet l'enregistrement de tous les conctacts (utiliser aussi pour la modification d'un contact)
 *
 * param contactsJson = tous les contacts sous forme d'une string encoder en Json
 */
export async function saveAllContactsToDBB(contactsJson)
{
  try
  {
    await AsyncStorage.setItem('@MyContact:key', JSON.stringify(contactsJson));
    console.log('BDD save');
  }
  catch (error)
  {
    console.log(error);
  }
}

/**
 * permet de supprimer un contact précis
 *
 * param contactJson = l'object contact sous forme d'une string encoder en Json
 */
export async function deleteContactToDBB(contactJson, deleteContact);
{
  try
  {
    //TODO revenir ici quand possibilité de tester, il faut enlever un élément de la liste JSON
    saveAllContactsToDBB(contactJson);
  }
  catch (error)
  {
    console.log(error);
  }
}
