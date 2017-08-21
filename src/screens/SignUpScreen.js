import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';

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
  },
});

export default class SignUpScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Sign Up',
    drawerLockMode: 'locked-closed',
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="S'enregistrer" />
        <BackButton navigation={navigation} param={LOGIN_SCENE_NAME} />
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
