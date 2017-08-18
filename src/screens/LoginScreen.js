import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNUP_SCENE_NAME } from './SignUpScreen';
import { PASSWORD_RESET_SCENE_NAME } from './PasswordResetScreen';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
});

export default class LoginScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Login',
    drawerLockMode: 'locked-closed',
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Connexion" />
        <Button
          onPress={() =>
          {
            navigation.navigate(HOME_SCENE_NAME);
          }
          }
          title="Menu connecté"
        />
        <Button
          onPress={() =>
          {
            navigation.navigate(SIGNUP_SCENE_NAME);
          }
          }
          title="S'inscrire"
        />
        <Button
          onPress={() =>
          {
            navigation.navigate(PASSWORD_RESET_SCENE_NAME);
          }
          }
          title="Mot de passe oublié ?"
        />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
