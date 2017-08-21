import React, { Component } from 'react';
import { Button, StyleSheet, Platform, View, TextInput } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNUP_SCENE_NAME } from './SignUpScreen';
import { PASSWORD_RESET_SCENE_NAME } from './PasswordResetScreen';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

const $bgColor = 'blue';
const $inputBorderColor = '#E0E4CC';
const $inputErrorColor = 'red';
const $whiteColor = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    top: (Platform.OS === 'ios') ? 56 : 36,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  },
  textInput: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
  },
  button: {
    flex: 1,
    backgroundColor: $inputErrorColor,
    color: $bgColor,
    justifyContent: 'center',
  },
});

export default class LoginScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Login',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.state = { checked: false };
  }

  checkboxCheck()
  {
    this.setState({ checked: !this.state.checked });
  }

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Connexion" />
        <View style={styles.content}>
          <View style={styles.cell}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.keepText(text)}
              keyboardType="numeric"
              placeholder="Numéro de téléphone"
              ref={(input) =>
              {
                this.textInput = input;
              }}
              maxLength={10}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ text })}
              keyboardType="numeric"
              placeholder="Mot de passe"
              secureTextEntry
              maxLength={4}
            />
          </View>
          <View style={styles.cell}>
            <ListItem onPress={() => this.checkboxCheck()}>
              <CheckBox checked={this.state.checked} />
              <Body>
                <Text>Se souvenir de Moi</Text>
              </Body>
            </ListItem>
            <Button
              style={styles.button}
              onPress={() =>
              {
                navigation.navigate(HOME_SCENE_NAME);
              }
              }
              title="Se connecter"
            />
          </View>
          <View style={styles.cell}>
            <Button
              style={styles.button}
              onPress={() =>
              {
                navigation.navigate(SIGNUP_SCENE_NAME);
              }
              }
              title="S'inscrire"
            />
            <Button
              style={styles.button}
              onPress={() =>
              {
                navigation.navigate(PASSWORD_RESET_SCENE_NAME);
              }
              }
              title="Mot de passe oublié ?"
            />
          </View>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
