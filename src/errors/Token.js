import { LOGIN_SCENE_NAME } from '../screens/LoginScreen';
import { DeleteTokenFromBDD } from '../BDD/Token';
import { showInformativePopin } from '../Popin';
import { errorPopinTitle, tokenInvalid, tokenEmpty, noNetwork } from '../errors/ErrorStrings';

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
  if (codeRetour === 401)
  {
    showInformativePopin(errorPopinTitle, tokenInvalid);
    logout(props);
    return false;
  }
  return true;
}

export function handleFirstConnectivityChange(isConnected)
{
  console.log(`Then, is ${isConnected ? 'online' : 'offline'}`);
  if (!isConnected)
  {
    showInformativePopin(errorPopinTitle, noNetwork);
  }
}
