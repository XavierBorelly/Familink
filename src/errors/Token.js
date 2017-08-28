import { LOGIN_SCENE_NAME } from '../screens/LoginScreen';
import { DeleteTokenFromBDD } from '../BDD/Token';

function logout(props)
{
  const navigation = props;
  navigation.navigate(LOGIN_SCENE_NAME);
  DeleteTokenFromBDD();
}

export function tokenIsFull(token, props)
{
  if (token === '' || token === undefined || token === null)
  {
    logout(props);
    return false;
  }
  return true;
}

export function tokenIsValid(codeRetour, props)
{
  if (codeRetour !== 200 && codeRetour !== 204)
  {
    logout(props);
    return false;
  }
  return true;
}
