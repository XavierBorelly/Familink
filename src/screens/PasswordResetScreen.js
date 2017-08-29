import React, { Component } from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import BackButton from '../components/BackButton';
import familinkStyles from '../Style';

export const PASSWORD_RESET_SCENE_NAME = 'PASSWORD_RESET_SCENE';

export default class PasswordResetScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Password reset',
    drawerLockMode: 'locked-closed',
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={familinkStyles.container}>
        <Header navigation={navigation} title="Mot de passe oublié" />
        <BackButton navigation={navigation} param={LOGIN_SCENE_NAME} />
      </View>
    );
  }
}

PasswordResetScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
