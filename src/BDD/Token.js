import
{
  AsyncStorage,
} from 'react-native';

// permet d'enregistrer le token en local
export async function saveTokenToBDD(token)
{
  try
  {
    AsyncStorage.setItem('@TokenAuthentification:key', token);
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
    const token = await AsyncStorage.getItem('@TokenAuthentification:key');
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
    await AsyncStorage.removeItem('@TokenAuthentification:key');
    console.log('token supprimer');
  }
  catch (error)
  {
    return Promise.reject(error);
  }
}
