import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Picker } from 'react-native';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

const $focusedColor = '#DDFFEE';
const $inputBorderColor = '#E0E4CC';
const $inputErrorColor = '#CF000F';
const $whiteColor = '#FFFFFF';
const $blackColor = '#000000';

// Chaines de caractères utilisés pour savoir quel élément est focus
const phoneNumberInput = 'phone';
const passwordInput = 'password';
const confirmPasswordInput = 'confirmPassword';
const nameInput = 'name';
const surnameInput = 'surname';
const mailInput = 'email';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    flex: 0.1,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
  },
  burgerMenu: {
    width: '20%',
    borderRightWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  content: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    width : '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  textInputError: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 0.8,
    color: $whiteColor,
    backgroundColor: $inputErrorColor,
  },
  button: {
    flex: 1,
    backgroundColor: $inputErrorColor,
  },
});

export default class SignUpScreen extends Component
{
  static navigationOptions =
  {
    title: 'Sign Up',
  };

  constructor(props)
  {
    super(props);
    this.state = { errors: null, profil: null, focused: 'null' };
  }

  setFocus(focusedItemName) {
         this.setState({
           focused: focusedItemName,
     })
   }

   resetFocus() {
     this.setState({
       focused: 'null'
     })
   }



  render()
  {

    const title = "S'enregistrer";
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.burgerMenu}>
            _______
          </Text>

          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </View>
        <View style={styles.content}>

          <View style={this.state.focused === phoneNumberInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === phoneNumberInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              keyboardType="numeric"
              placeholder="Numéro de téléphone"
              selectTextOnFocus= {true}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(phoneNumberInput)}
              maxLength={10}
            />
          </View>
          <View style={this.state.focused === passwordInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === passwordInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              keyboardType="numeric"
              placeholder="Mot de passe"
              selectTextOnFocus= {true}
              secureTextEntry={true}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(passwordInput)}
              maxLength={4}
            />
          </View>

          <View style={this.state.focused === confirmPasswordInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === confirmPasswordInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              keyboardType="numeric"
              placeholder="Confirmation du mot de passe"
              selectTextOnFocus= {true}
              secureTextEntry={true}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(confirmPasswordInput)}
              maxLength={4}
            />
          </View>

          <View style={this.state.focused === nameInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === nameInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              placeholder="Nom"
              selectTextOnFocus= {true}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(nameInput)}
              maxLength={15}
            />
          </View>

          <View style={this.state.focused === surnameInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === surnameInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              placeholder="Prenom"
              selectTextOnFocus= {true}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(surnameInput)}
              maxLength={15}
            />
          </View>

          <View style={this.state.focused === mailInput ? styles.cellFocused : styles.cell}>
            <TextInput
              style={this.state.focused === mailInput ? styles.textInputFocused : styles.textInput}
              onChangeText={(text) => this.setState({text})}
              placeholder="Email"
              selectTextOnFocus= {true}
              maxLength={50}
              onBlur={() => this.resetFocus()}
              onFocus={() => this.setFocus(mailInput)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.cell}>
            <Picker
              selectedValue={this.state.profil}
              onValueChange={(itemValue, itemIndex) => this.setState({profil: itemValue})}>
              <Picker.Item label="Senior" value="senior" />
              <Picker.Item label="Famille" value="famille" />
              <Picker.Item label="Medecin" value="medecin" />
            </Picker>
          </View>
          <View style={styles.cell}>
            <Button style={styles.button}
              //onPress={onPressLearnMore}
              title="Valider"
              color="#841584"
            />
          </View>
        </View>
      </View>
    );
  }
}
