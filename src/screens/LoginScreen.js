import React, { Component } from 'react';
import { Image, View, TextInput, AsyncStorage, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';

import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuIcon from '../../assets/icon_logout.png';
import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNUP_SCENE_NAME } from './SignUpScreen';
import { PASSWORD_RESET_SCENE_NAME } from './PasswordResetScreen';
import { login, setWebServiceNavigationUser } from '../WS/WebServiceUser';
import { checkLogin } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { setWebServiceNavigationContact } from '../WS/WebServiceContact';
import familinkStyles from '../Style';
import { buttonLabelConnection, buttonLabelForgotPassword, buttonLabelSignIn, keyRememberMeCheckBox, keyUserOnLogin } from '../Util';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

let errors = [];

export default class LoginScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Déconnexion',
    drawerLockMode: 'locked-closed',
    drawerIcon: (<Image source={MenuIcon} style={[familinkStyles.burgerMenuIcon]} />),
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
    setWebServiceNavigationUser(this.props.navigation);
    setWebServiceNavigationContact(this.props.navigation);
    try
    {
      await AsyncStorage.getItem(keyRememberMeCheckBox).then((etat) =>
      {
        this.setState({ checked: JSON.parse(etat) });
      });
      if (this.state.checked === true)
      {
        await AsyncStorage.getItem(keyUserOnLogin).then((identifiant) =>
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
      await AsyncStorage.setItem(keyRememberMeCheckBox, JSON.stringify(checked));
    }
    catch (e)
    {
      return Promise.reject(e);
    }
    if (checked === true)
    {
      try
      {
        await AsyncStorage.setItem(keyUserOnLogin, user);
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
        <View style={familinkStyles.container}>
          <Header
            navigation={navigation}
            title="Connexion"
            loginPage
          />
          <View style={familinkStyles.content}>

            <View style={familinkStyles.item}>
              <TextInput
                style={familinkStyles.textInput}
                onChangeText={user => this.setState({ user })}
                keyboardType="numeric"
                placeholder="Numéro de téléphone"
                underlineColorAndroid="transparent"
                defaultValue={this.state.user}
                ref={(input) =>
                {
                  this.textInput = input;
                }}
                maxLength={10}
              />

            </View>
            <View style={familinkStyles.item}>
              <TextInput
                style={familinkStyles.textInput}
                onChangeText={password => this.setState({ password })}
                keyboardType="numeric"
                placeholder="Mot de passe"
                underlineColorAndroid="transparent"
                secureTextEntry
                maxLength={4}
              />
            </View>

            <View style={familinkStyles.item}>
              <ListItem onPress={() => this.checkboxCheck()}>
                <CheckBox checked={this.state.checked} />
                <Body>
                  <Text>Se souvenir de Moi</Text>
                </Body>
              </ListItem>
            </View>
            <View style={familinkStyles.item}>
              <TouchableHighlight
                style={familinkStyles.button}
                onPress={() =>
                {
                  this.doConnection();
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelConnection}</Text>
              </TouchableHighlight>
            </View>

            <View style={familinkStyles.item}>
              <TouchableHighlight
                style={familinkStyles.button}
                onPress={() =>
                {
                  navigation.navigate(SIGNUP_SCENE_NAME);
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelSignIn}</Text>

              </TouchableHighlight>
            </View>

            <View style={familinkStyles.item} />

            <View style={familinkStyles.item}>
              <TouchableHighlight
                style={familinkStyles.button}
                onPress={() =>
                {
                  navigation.navigate(PASSWORD_RESET_SCENE_NAME);
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelForgotPassword}</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={familinkStyles.bottomBar} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
