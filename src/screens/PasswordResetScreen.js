import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import { LOGIN_SCENE_NAME } from './LoginScreen';

export const PASSWORD_RESET_SCENE_NAME = 'PASSWORD_RESET_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
});

export default class PasswordResetScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Password reset',
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mot de passe oublié" />
        <Button onPress={() => {
          navigation.navigate(LOGIN_SCENE_NAME) 
        ;}}
        title="Connexion"
        />
      </View>
    );
  }
}
