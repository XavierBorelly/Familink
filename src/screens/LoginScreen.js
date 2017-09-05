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
import { checkLoginUser, checkLoginPassword } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { setWebServiceNavigationContact } from '../WS/WebServiceContact';
import familinkStyles from '../Style';
import { buttonLabelConnection, buttonLabelForgotPassword, labelSignOut, buttonLabelSignIn, keyRememberMeCheckBox, keyUserOnLogin, placeholderPhoneNumber, placeholderpassword, checkBoxLabel, headerSignIn } from '../Util';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

let errors = [];

export default class LoginScreen extends Component
{
  static navigationOptions = {
    drawerLabel: labelSignOut,
    drawerLockMode: 'locked-closed',
    drawerIcon: (<Image source={MenuIcon} style={[familinkStyles.burgerMenuIcon]} />),
  };

  constructor(props)
  {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      checked: false,
      user: '',
      password: null,
      messageInfo: '',
      errors: ['', ''] };
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
      errors.push(checkLoginUser(this.state.messageInfo));
      errors.push(checkLoginPassword(this.state.messageInfo));
      this.setState({ errors });
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
    }, () => 0);
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
            title={headerSignIn}
            loginPage
          />
          <View style={familinkStyles.content}>

            <View style={familinkStyles.item}>
              <TextInput
                style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={user => this.setState({ user })}
                keyboardType="numeric"
                placeholder={placeholderPhoneNumber}
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
                style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={password => this.setState({ password })}
                keyboardType="numeric"
                placeholder={placeholderpassword}
                underlineColorAndroid="transparent"
                secureTextEntry
                maxLength={4}
              />
            </View>

            <View style={familinkStyles.item}>
              <ListItem>
                <CheckBox
                  checked={this.state.checked}
                  onPress={() => this.checkboxCheck()}
                />
                <Body>
                  <TouchableWithoutFeedback onPress={() => this.checkboxCheck()}>
                    <Text>{checkBoxLabel}</Text>
                  </TouchableWithoutFeedback>
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
