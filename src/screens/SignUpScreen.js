import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View, DeviceEventEmitter, Dimensions, LayoutAnimation, Text, TouchableHighlight, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import BackButton from '../components/BackButton';

import Header from '../components/Header';
import ProfilePicker from '../components/ProfilePicker';
import { saveUser } from '../WS/WebServiceUser';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import { checkPhoneNumber, checkPassword, checkSurname, checkMail } from '../errors/FamilinkErrors';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import { labelInformativePopinTitle, labelUserCreated } from '../Util';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

const $bgColor = '#0091EA';

const $focusedColor = '#DDFFEE';
const $inputBorderColor = '#E0E4CC';
const $lightgrayColor = 'red';
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
    backgroundColor: $bgColor,

    flex: 0.8,
    width: '80%',
    borderRadius: 6,
  },
  cell: {
    flex: 1,
    paddingTop: 2,
  },
  cellFocused: {

    flex: 3,
    paddingTop: 2,
  },
  textInput: {
    paddingLeft: 10,
    borderRadius: 6,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,

    borderColor:'#DDDDDD',
    borderWidth: 1,
  },
  textInputFocused: {
    paddingLeft: 10,
    borderRadius: 6,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $focusedColor,
  },
  button:{

      borderRadius: 8,
      backgroundColor: '#FF5722',
      flex: 1,
      color: 'white',
      borderColor:'#BF360C',
      borderWidth: 1,

      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
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
      profil: 'SENIOR',
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
                placeholder="Numéro de téléphone *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
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
                placeholder="Mot de passe *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
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
                placeholder="Confirmation du mot de passe *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
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
                autoCorrect={false}
                underlineColorAndroid="transparent"
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
                placeholder="Prenom *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(surnameInput)}
                maxLength={15}
              />
            </View>

            <View style={this.state.focused === mailInput ? styles.cellFocused : styles.cell}>
              <TextInput
                style={this.state.focused === mailInput ? styles.textInputFocused : styles.textInput}
                onChangeText={text => this.setState({ email: text })}
                placeholder="Email *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
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
            <View style={styles.cell}>
            <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
              <Text style={{color:'white', fontSize:28, fontWeight:'bold'}}>Valider</Text>
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
