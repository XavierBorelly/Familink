import { LOGIN_SCENE_NAME } from '../screens/LoginScreen';
import { DeleteTokenFromBDD } from '../BDD/Token';
import { showInformativePopin } from '../Popin';
import { errorPopinTitle, tokenInvalid, tokenEmpty } from '../errors/ErrorStrings';

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
    showInformativePopin(errorPopinTitle, tokenEmpty);
    logout(props);
    return false;
  }
  return true;
}

export function tokenIsValid(codeRetour, props)
{
  if (codeRetour !== 200 && codeRetour !== 204)
  {
    showInformativePopin(errorPopinTitle, tokenInvalid);
    logout(props);
    return false;
  }
  return true;
}
