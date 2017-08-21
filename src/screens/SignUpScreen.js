import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import { LOGIN_SCENE_NAME } from './LoginScreen';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  }
});

export default class SignUpScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Sign Up',
  };

  render()
  {
    let navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="S'enregistrer" />
        <Button onPress={() => { navigation.navigate(LOGIN_SCENE_NAME)} } title="Connexion" />
      </View>
    );
  }
}
