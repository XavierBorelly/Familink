import React, { Component } from 'react';
import { TextInput, View, Text, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native';

import familinkStyles from '../Style';
import Header from '../components/Header';
import ProfilePicker from '../components/ProfilePicker';
import { saveUser } from '../WS/WebServiceUser';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import { checkPhoneNumber, checkPassword, checkSurname, checkMail, checkProfil } from '../errors/FamilinkErrors';
import { errorPopinTitle, phoneDuplicated } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { labelInformativePopinTitle, labelUserCreated, buttonLabelValidation, placeholderFirstnameMandatory, placeholderName, placeholderPhoneNumberMandatory, placeholderEmailMandatory, placeholderPasswordMandatory, placeholderPasswordConfirmMandatory, headerModifySignUp } from '../Util';

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
      profil: null,
      errors: ['', '', '', '', ''],
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
          <Header
            navigation={navigation}
            title={headerModifySignUp}
            goBackTo={LOGIN_SCENE_NAME}
          />
          <View style={familinkStyles.content}>

            <View style={this.state.focused === phoneNumberInput ?
              familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ phone: text })}
                keyboardType="numeric"
                placeholder={placeholderPhoneNumberMandatory}
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
                placeholder={placeholderPasswordMandatory}
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
                placeholder={placeholderPasswordConfirmMandatory}
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
                placeholder={placeholderName}
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
                placeholder={placeholderFirstnameMandatory}
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
                placeholder={placeholderEmailMandatory}
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
              error={this.state.errors[4]}
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
                  // Sur l'appui du bouton valider, check si il y a des champs erronés
                  const errorArray = [];
                  errorArray.push(checkPhoneNumber(this.state.phone));
                  errorArray.push(checkPassword(this.state.password, this.state.confirmPassword));
                  errorArray.push(checkSurname(this.state.firstName));
                  errorArray.push(checkMail(this.state.email));
                  errorArray.push(checkProfil(this.profilePickerComponent.state.profil));
                  this.setState({ errors: errorArray });

                  let thereIsErrors = false;
                  // Check si l'une des cases de 'errorArray' n'est pas vide
                  for (let i = 0; i < errorArray.length; i += 1)
                  {
                    if (errorArray[i] !== '')
                    {
                      showInformativePopin(errorPopinTitle, errorArray[i]);
                      thereIsErrors = true;
                      break;
                    }
                  }
                  // Si il n'y a pas d'erreurs, on tente d'enregistrer un user
                  if (!thereIsErrors)
                  {
                    saveUser(this.state.phone, this.state.password, this.state.name,
                      this.state.firstName, this.state.email,
                      this.profilePickerComponent.state.profil)
                      .then((response) =>
                      {
                      // Affiche une erreur au cas où le numéro de téléphone existe déja dans la BDD
                        if (response.message === `user validation failed: phone: Error, expected \`phone\` to be unique. Value: \`${this.state.phone}\``)
                        {
                          errorArray[0] = response.message;
                          this.setState({ errors: errorArray });
                          showInformativePopin(errorPopinTitle, phoneDuplicated);
                        }
                        // Sinon, aucune erreures, on revient a la page de login
                        else
                        {
                          showInformativePopin(labelInformativePopinTitle, labelUserCreated);
                          navigation.navigate(LOGIN_SCENE_NAME);
                        }
                      });
                  }
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelValidation}</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={familinkStyles.bottomBar} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
