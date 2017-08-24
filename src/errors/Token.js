import { LOGIN_SCENE_NAME } from '../screens/LoginScreen';
import { DeleteTokenFromBDD } from '../BDD/Token';

function logout(props)
{
  const navigation = props;
  navigation.navigate(LOGIN_SCENE_NAME);
  DeleteTokenFromBDD();
}

export function tokenVide(token, props)
{
  if (token === '' || token === undefined || token === null)
  {
    console.log('----------------');
    console.log('logout : vide');
    console.log('----------------');
    logout(props);
    return false;
  }
  return true;
}

export function tokenInvalide(codeRetour, props)
{
  if (codeRetour !== 200 && codeRetour !== 204)
  {
    console.log('----------------');
    console.log('logout : invalide');
    console.log('----------------');
    logout(props);
    return false;
  }
  return true;
}
