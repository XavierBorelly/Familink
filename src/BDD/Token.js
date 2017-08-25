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
    return '';
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
      return token;
    }
    return '';
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
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}
