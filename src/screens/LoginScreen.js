import React, { Component } from 'react';
import { Button, StyleSheet, Platform, View, TextInput, AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNUP_SCENE_NAME } from './SignUpScreen';
import { PASSWORD_RESET_SCENE_NAME } from './PasswordResetScreen';
import { login } from '../WS/WebServiceUser';
import { checkLogin } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { keyStateCheckBox, keyUser } from '../Util';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

const $bgColor = 'blue';
const $inputBorderColor = '#E0E4CC';
const $inputErrorColor = 'red';
const $whiteColor = '#FFFFFF';

let errors = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    top: (Platform.OS === 'ios') ? 38 + 20 : 38,
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
    drawerLabel: 'Déconnexion',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = { checked: false, user: '', password: null, messageInfo: '' };
  }

  componentDidMount()
  {
    this.getRemember();
  }

  // Rappeler l'identifiant si on avait coché Se souvenir de moi
  async getRemember()
  {
    try
    {
      await AsyncStorage.getItem(keyStateCheckBox).then((etat) =>
      {
        this.setState({ checked: JSON.parse(etat) });
      });
      if (this.state.checked === true)
      {
        await AsyncStorage.getItem(keyUser).then((identifiant) =>
        {
          this.setState({ user: identifiant });
        });
      }
    }
    catch (error)
    {
      return Promise.reject(error);
    }
    return true;
  }

  // Modifier l'état de la checkbox
  checkboxCheck()
  {
    this.setState({ checked: !this.state.checked });
  }

  // Fonction de Connexion
  async doConnection()
  {
    // Se souvenir de moi
    const user = this.state.user;
    const password = this.state.password;
    const checked = this.state.checked;
    try
    {
      await AsyncStorage.setItem(keyStateCheckBox, JSON.stringify(checked));
    }
    catch (e)
    {
      return Promise.reject(e);
    }
    if (checked === true)
    {
      try
      {
        await AsyncStorage.setItem(keyUser, user);
      }
      catch (error)
      {
        return Promise.reject(error);
      }
    }

    // Vérifier que les informations sont correctes
    login(user, password).then((response) =>
    {
      this.setState({ messageInfo: response });
      errors = [];
      errors.push(checkLogin(this.state.messageInfo));
      let thereIsErrors = false;
      for (let i = 0; i < errors.length; i += 1)
      {
        if (errors[i] !== '')
        {
          // PopIn d'erreur
          showInformativePopin(errorPopinTitle, errors[i]);
          thereIsErrors = true;
        }
      }
      if (!thereIsErrors)
      {
        this.props.navigation.navigate(HOME_SCENE_NAME);
      }
    });
    return true;
  }

  render()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header navigation={navigation} title="Connexion" />
          <View style={styles.content}>
            <View style={styles.cell}>
              <TextInput
                style={styles.textInput}
                onChangeText={user => this.setState({ user })}
                keyboardType="numeric"
                placeholder="Numéro de téléphone"
                defaultValue={this.state.user}
                ref={(input) =>
                {
                  this.textInput = input;
                }}
                maxLength={10}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
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
                  this.doConnection();
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
      </TouchableWithoutFeedback>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
