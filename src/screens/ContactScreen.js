import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import { addContact } from '../actions/contacts.action';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import BackButton from '../components/BackButton';
import Gravatar from '../components/Gravatar';
import Header from '../components/Header';

export const CONTACT_SCENE_NAME = 'CONTACT_SCENE';

const $bgColor = '#F5FCFF';
const $focusedColor = '#DDFFEE';
const $inputBorderColor = '#E0E4CC';
const $whiteColor = '#FFFFFF';

// Chaines de caractères utilisés pour savoir quel élément est focus
const phoneNumberInput = 'phone';
const lastNameInput = 'lastName';
const firstNameInput = 'firstName';
const mailInput = 'email';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: $bgColor,
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
  identityContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  buttonsContainer: {
    backgroundColor: $whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    backgroundColor: $inputBorderColor,
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
});


export class ContactScreen extends Component
{
  constructor(props)
  {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      editMode: (params.id !== 0),
      errors: null,
      focused: 'null',

      lastName: params.lastName || '',
      firstName: params.firstName || '',
      phone: params.phone || '',
      email: params.email || '',
    };

    this.add = this.add.bind(this);
  }

  setFocus(focusedItemName)
  {
    this.setState({
      focused: focusedItemName,
    });
  }

  getActionButtons()
  {
    if (this.state.editMode)
    {
      return (
        <View />
      );
    }
    // Creation mode
    return (
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.add}
            title="Valider"
            color="#D35400"
            accessibilityLabel="Créer le contact"
          />
        </View>
      </View>
    );
  }

  add()
  {
    const props = this.props;
    const state = this.state;

    const response = props.addContact({
      phone: state.phone,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      isEmergencyUser: false,
    });

    if (response.saved)
    {
      props.navigation.navigate(PHONEBOOK_SCENE_NAME);
    }
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
    const actionButtons = this.getActionButtons();

    return (
      <View style={styles.container}>
        <Header
          hasMenu
          navigation={navigation}
          title={
            this.state.editMode ? 'Modification contact' : 'Création contact'
          }
        />
        <View style={styles.content}>
          <View style={styles.identityContainer}>
            <View>
              <Gravatar size={100} />
            </View>
            <View style={[styles.cell, styles.flexColumn]}>

              <View style={this.state.focused === lastNameInput ? styles.cellFocused : styles.cell}>
                <TextInput
                  style={this.state.focused === lastNameInput
                    ? styles.textInputFocused : styles.textInput}
                  onChangeText={text => this.setState({ lastName: text })}
                  placeholder="Nom"
                  selectTextOnFocus
                  onBlur={() => this.resetFocus()}
                  onFocus={() => this.setFocus(lastNameInput)}
                  maxLength={15}
                />
              </View>

              <View style={this.state.focused === firstNameInput
                ? styles.cellFocused : styles.cell}
              >
                <TextInput
                  style={this.state.focused === firstNameInput ?
                    styles.textInputFocused : styles.textInput}
                  onChangeText={text => this.setState({ firstName: text })}
                  placeholder="Prenom"
                  selectTextOnFocus
                  onBlur={() => this.resetFocus()}
                  onFocus={() => this.setFocus(firstNameInput)}
                  maxLength={15}
                />
              </View>

            </View>
          </View>


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

          {actionButtons}

        </View>

        <BackButton navigation={navigation} param={PHONEBOOK_SCENE_NAME} />
      </View>
    );
  }
}

ContactScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};


// Map your custom actions to dispatcher
function mapDispatchToProps(dispatch)
{
  return {
    addContact: jsonValues => dispatch(addContact(jsonValues)),
  };
}

// connect screen elements to redux object
export default connect(null, mapDispatchToProps)(ContactScreen);
