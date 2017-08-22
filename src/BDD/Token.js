import
{
  AsyncStorage,
} from 'react-native';
import { keyStorageToken } from '../Util';

// permet d'enregistrer le token en local
export async function saveTokenToBDD(token)
{
  try
  {
    const structureToken = `Bearer ${token}`;
    AsyncStorage.setItem(keyStorageToken, structureToken);
    console.log('token sauvegarder');
    return true;
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

// permet de récupérer le token
export async function getTokenFromBDD()
{
  try
  {
    const token = await AsyncStorage.getItem(keyStorageToken);
    if (token !== null)
    {
      console.log('token renvoyer');
      return token;
    }
    console.log('token inexistant');
    return false;
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}

// permet de detruire le token quand on ce log-out ou qu'il est expirer
export async function DeleteTokenFromBDD()
{
  try
  {
    await AsyncStorage.removeItem(keyStorageToken);
    console.log('token supprimer');
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}
