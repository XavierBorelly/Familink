import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import BackButton from '../components/BackButton';

import Header from '../components/Header';
import ProfilePicker, { profil } from '../components/ProfilePicker';
import { saveUser } from '../WS/WebServiceUser';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import { checkPhoneNumber, checkPassword, checkSurname, checkMail } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

const $bgColor = '#F5FCFF';

const $focusedColor = '#DDFFEE';
const $inputBorderColor = '#E0E4CC';
const $lightgrayColor = '#EEEEEE';
const $whiteColor = '#FFFFFF';

// Chaines de caractères utilisés pour savoir quel élément est focus
const phoneNumberInput = 'phone';
const passwordInput = 'password';
const confirmPasswordInput = 'confirmPassword';
const nameInput = 'name';
const surnameInput = 'surname';
const mailInput = 'email';

let errors = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  content: {
    backgroundColor: $lightgrayColor,
    flex: 0.8,
    width: '80%',
  },
  cell: {
    flex: 1,
  },
  cellFocused: {
    flex: 3,
  },
  textInput: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
  },
  textInputFocused: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $focusedColor,
  },
});

export default class SignUpScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Sign Up',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.state = { errors: null,
      focused: 'null',
      phone: null,
      password: null,
      confirmPassword: null,
      name: null,
      firstName: null,
      email: null,
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
      <View style={styles.container}>
        <Header navigation={navigation} title="S'enregistrer" />
        <BackButton navigation={navigation} param={LOGIN_SCENE_NAME} />
        <View style={styles.content}>

          <View style={this.state.focused === phoneNumberInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === phoneNumberInput ?
                styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ phone: text })}
              keyboardType="numeric"
              placeholder="Numéro de téléphone"
              selectTextOnFocus
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(phoneNumberInput)}
              maxLength={10}
            />
          </View>

          <View style={this.state.focused === passwordInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === passwordInput ?
                styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ password: text })}
              keyboardType="numeric"
              placeholder="Mot de passe"
              selectTextOnFocus
              secureTextEntry
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(passwordInput)}
              maxLength={4}
            />
          </View>

          <View style={this.state.focused === confirmPasswordInput ?
            styles.cellFocused : styles.cell}
          >
            <TextInput
              style={this.state.focused === confirmPasswordInput ?
                styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ confirmPassword: text })}
              keyboardType="numeric"
              placeholder="Confirmation du mot de passe"
              selectTextOnFocus
              secureTextEntry
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(confirmPasswordInput)}
              maxLength={4}
            />
          </View>

          <View style={this.state.focused === nameInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === nameInput ? styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ name: text })}
              placeholder="Nom"
              selectTextOnFocus
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(nameInput)}
              maxLength={15}
            />
          </View>

          <View style={this.state.focused === surnameInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === surnameInput ?
                styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ firstName: text })}
              placeholder="Prenom"
              selectTextOnFocus
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(surnameInput)}
              maxLength={15}
            />
          </View>

          <View style={this.state.focused === mailInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === mailInput ? styles.textInputFocused : styles.textInput}
              onChangeText={text => this.setState({ email: text })}
              placeholder="Email"
              selectTextOnFocus
              maxLength={50}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(mailInput)}
              keyboardType="email-address"
            />
          </View>

          <ProfilePicker />

          <View style={styles.cell}>
            <Button
              onPress={() =>
              {
                errors = [];
                errors.push(checkPhoneNumber(this.state.phone));
                errors.push(checkPassword(this.state.password, this.state.confirmPassword));
                errors.push(checkSurname(this.state.firstName));
                errors.push(checkMail(this.state.email));

                let thereIsErrors = false;
                for (let i = 0; i < errors.length; i += 1)
                {
                  if (errors[i] !== '')
                  {
                    showInformativePopin(errorPopinTitle, errors[i]);
                    thereIsErrors = true;
                    break;
                  }
                }
                if (!thereIsErrors)
                {
                  saveUser(this.state.phone, this.state.password, this.state.name,
                    this.state.firstName, this.state.email, profil);
                }
              }
              }
              title="Valider"
              color="#D35400"
              accessibilityLabel="Valider"
            />
          </View>
        </View>
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
