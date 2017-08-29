import React, { Component } from 'react';
import { TextInput, View, Text, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native';
import BackButton from '../components/BackButton';

import familinkStyles from '../Style';
import Header from '../components/Header';
import ProfilePicker from '../components/ProfilePicker';
import { saveUser } from '../WS/WebServiceUser';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import { checkPhoneNumber, checkPassword, checkSurname, checkMail } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { labelInformativePopinTitle, labelUserCreated, buttonLabelValidation } from '../Util';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

// Chaines de caractères utilisés pour savoir quel élément est focus
const phoneNumberInput = 'phone';
const passwordInput = 'password';
const confirmPasswordInput = 'confirmPassword';
const nameInput = 'name';
const surnameInput = 'surname';
const mailInput = 'email';

export default class SignUpScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Sign Up',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.state = {
      focused: 'null',
      phone: null,
      password: null,
      confirmPassword: null,
      name: null,
      firstName: null,
      email: null,
      profil: 'SENIOR',
      errors: ['', '', '', ''],
    };
  }

  setFocus(focusedItemName)
  {
    this.setState({
      focused: focusedItemName,
    });
  }

  resetFocus()
  {
    this.setState({
      focused: 'null',
    });
  }

  render()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={familinkStyles.container}>
          <Header navigation={navigation} title="S'enregistrer" />
          <BackButton navigation={navigation} param={LOGIN_SCENE_NAME} />
          <View style={familinkStyles.content}>

            <View style={this.state.focused === phoneNumberInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ phone: text })}
                keyboardType="numeric"
                placeholder="Numéro de téléphone *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(phoneNumberInput)}

                maxLength={10}
              />
            </View>

            <View style={this.state.focused === passwordInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ password: text })}
                keyboardType="numeric"
                placeholder="Mot de passe *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                secureTextEntry
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(passwordInput)}
                maxLength={4}
              />
            </View>

            <View style={this.state.focused === confirmPasswordInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ confirmPassword: text })}
                keyboardType="numeric"
                placeholder="Confirmation du mot de passe *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                secureTextEntry
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(confirmPasswordInput)}
                maxLength={4}
              />
            </View>

            <View style={this.state.focused === nameInput
              ? familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={familinkStyles.textInput}
                onChangeText={text => this.setState({ name: text })}
                placeholder="Nom"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(nameInput)}
                maxLength={15}
              />
            </View>

            <View style={this.state.focused === surnameInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[2] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ firstName: text })}
                placeholder="Prenom *"
                selectTextOnFocus
                placeholderTextColor="#909090"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(surnameInput)}
                maxLength={15}
              />
            </View>

            <View style={this.state.focused === mailInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[3] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ email: text })}
                placeholder="Email *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                maxLength={50}
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(mailInput)}
                keyboardType="email-address"
              />
            </View>

            <ProfilePicker
              ref={(profilePickerComponent) =>
              {
                this.profilePickerComponent = profilePickerComponent;
              }
              }
            />

            <View style={familinkStyles.item}>
              <TouchableHighlight
                style={familinkStyles.button}
                onPress={() =>
                {
                  const errorArray = [];
                  errorArray.push(checkPhoneNumber(this.state.phone));
                  errorArray.push(checkPassword(this.state.password, this.state.confirmPassword));
                  errorArray.push(checkSurname(this.state.firstName));
                  errorArray.push(checkMail(this.state.email));
                  this.setState({ errors: errorArray });

                  let thereIsErrors = false;
                  for (let i = 0; i < errorArray.length; i += 1)
                  {
                    if (errorArray[i] !== '')
                    {
                      showInformativePopin(errorPopinTitle, errorArray[i]);
                      thereIsErrors = true;
                      break;
                    }
                  }
                  if (!thereIsErrors)
                  {
                    saveUser(this.state.phone, this.state.password, this.state.name,
                      this.state.firstName, this.state.email,
                      this.profilePickerComponent.state.profil);
                    showInformativePopin(labelInformativePopinTitle, labelUserCreated);
                    navigation.navigate(LOGIN_SCENE_NAME);
                  }
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelValidation}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
