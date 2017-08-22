import { LOGIN_SCENE_NAME } from '../screens/LoginScreen';
import { DeleteTokenFromBDD } from '../BDD/Token';
import React, { PropTypes } from 'react';


export default class TokenError
{
  tokenVide(token, props)
  {
    if(token === '' || token === undefined || token === null)
    {
      this.logout(props);
      return false;
    }
    return true;
  }

  tokenInvalide(codeRetour, props)
  {
    if(codeRetour !== 200)
    {
      this.logout(props);
      return false;
    }
    return true;
  }

  logout(props) {
    const navigation = props;
    navigation.navigate(LOGIN_SCENE_NAME);
    DeleteTokenFromBDD();
  }
}

TokenError.propTypes = {
  navigation: PropTypes.func.isRequired,
  /* eslint-disable */
  param: PropTypes.any.isRequired,
  /* eslint-enable */
};
