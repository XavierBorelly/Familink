import React, { Component } from 'react';
import { View, Keyboard, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import familinkStyles from '../Style';
import { addContact } from '../actions/contacts.action';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import BackButton from '../components/BackButton';
import Gravatar from '../components/Gravatar';
import Header from '../components/Header';
import { checkRequiredStringValue, checkPhoneNumber, checkMail } from '../errors/FamilinkErrors';
import { errorPopinTitle, lastnameRequired, surnameRequired } from '../errors/ErrorStrings';
import Contact from '../models/Contact';
import ContactService from '../service/contactService';

import { showInformativePopin } from '../Popin';
import { labelInformativePopinTitle, labelContactCreatedSuccess, buttonLabelValidation } from '../Util';


export const CONTACT_SCENE_NAME = 'CONTACT_SCENE';

// Chaines de caractères utilisés pour savoir quel élément est focus
const phoneNumberInput = 'phone';
const lastNameInput = 'lastName';
const firstNameInput = 'firstName';
const mailInput = 'email';

const Mode = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
});

const defaultContact = new Contact(0);

export class ContactScreen extends Component
{
  static hasErrors(errorArray)
  {
    let index = 0;
    let findError = false;

    while (index < errorArray.length && !findError)
    {
      if (errorArray[index] !== '')
      {
        showInformativePopin(errorPopinTitle, errorArray[index]);
        findError = true;
      }
      index += 1;
    }

    return findError;
  }

  constructor(props)
  {
    super(props);

    const params = this.props.navigation.state.params;
    const contact = (params && params.contact) ? params.contact : defaultContact;
    // eslint-disable-next-line no-underscore-dangle
    const currentId = contact._id;

    this.state = {
      mode: (currentId != null && currentId !== '') ? Mode.UPDATE : Mode.CREATE,
      focused: 'null',
      gravatar: contact.gravatar || '',
      lastName: contact.lastName || '',
      firstName: contact.firstName || '',
      phoneNumber: contact.phone || '',
      email: contact.email || '',
      isFamilinkUser: contact.isFamilinkUser || false,
      isEmergencyUser: contact.isEmergencyUser || false,
      errors: ['', '', '', ''],
    };

    this.add = this.add.bind(this);
  }

  setFocus(focusedItemName)
  {
    this.setState({
      focused: focusedItemName,
    });
  }

  getTagView()
  {
    if (this.state.mode === Mode.UPDATE)
    {
      // Vue à coder lors de la modification
      return (
        <View style={familinkStyles.textItemContactContainer}>
          <Text style={this.state.isFamilinkUser ? familinkStyles.textFamilink : ''}>{this.state.isFamilinkUser ? 'Familink' : ''} </Text>
          <Text style={this.state.isEmergencyUser ? familinkStyles.textUrgency : ''}>{this.state.isEmergencyUser ? 'Urgence' : ''}</Text>
        </View>
      );
    }

    // Creation mode (pas de vue spécifique)
    return (<View />);
  }

  getActionButtons()
  {
    if (this.state.mode === Mode.UPDATE)
    {
      return (
        <View style={[familinkStyles.item]}>
          <Text>Modification/suppression non implémenté</Text>
        </View>
      );
    }

    // Creation mode
    return (
      <View style={[familinkStyles.item, familinkStyles.editContactButtonsContainer]}>
        <TouchableHighlight
          style={[familinkStyles.button, familinkStyles.editContactButtonContainer]}
          onPress={this.add}
        >
          <Text style={familinkStyles.buttonText}>{buttonLabelValidation}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  add()
  {
    const props = this.props;
    const state = this.state;

    const errorArray = [];

    errorArray.push(checkRequiredStringValue(state.lastName, lastnameRequired));
    errorArray.push(checkRequiredStringValue(state.firstName, surnameRequired));
    errorArray.push(checkPhoneNumber(state.phoneNumber));
    errorArray.push(checkMail(state.email));

    if (!ContactScreen.hasErrors(errorArray))
    {
      const newContact = new Contact(0, state.phoneNumber, state.firstName,
        state.lastName, state.email, null, null, false, false);

      ContactService.addContact(newContact).then((saveResponse) =>
      {
        // Seul le succès est gére (le webservice renvoie vers la page login en cas d'échec)
        if (saveResponse.saved)
        {
          showInformativePopin(labelInformativePopinTitle, labelContactCreatedSuccess);
          props.navigation.navigate(PHONEBOOK_SCENE_NAME);
        }
      });
    }
    else
    {
      this.setState({ errors: errorArray });
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

    const tagView = this.getTagView();
    const actionButtons = this.getActionButtons();

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={familinkStyles.container}>
          <Header
            hasMenu
            navigation={navigation}
            title={
              (this.state.mode === Mode.UPDATE ? 'Modification contact' : 'Création contact')
            }
          />
          <View style={familinkStyles.content}>

            <View style={familinkStyles.editContactIdentityContainer}>
              <View style={familinkStyles.gravatarContainer}>
                <Gravatar gravatarUrl={this.state.gravatar} email={this.state.email} size={100} />
              </View>
              <View style={[familinkStyles.item, familinkStyles.flexColumn]}>
                <View style={this.state.focused === lastNameInput ?
                  familinkStyles.itemFocused : familinkStyles.item}
                >
                  <TextInput
                    style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                    onChangeText={text => this.setState({ lastName: text })}
                    placeholder="Nom *"
                    selectTextOnFocus
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#909090"
                    onBlur={() => this.resetFocus()}
                    onFocus={() => this.setFocus(lastNameInput)}
                    maxLength={15}
                    value={this.state.lastName}
                  />
                </View>

                <View style={this.state.focused === firstNameInput
                  ? familinkStyles.itemFocused : familinkStyles.item}
                >
                  <TextInput
                    style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                    onChangeText={text => this.setState({ firstName: text })}
                    placeholder="Prenom *"
                    selectTextOnFocus
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#909090"
                    onBlur={() => this.resetFocus()}
                    onFocus={() => this.setFocus(firstNameInput)}
                    maxLength={15}
                    value={this.state.firstName}
                  />
                </View>

              </View>
            </View>

            {tagView}

            <View style={this.state.focused === phoneNumberInput
              ? familinkStyles.itemFocused : familinkStyles.item}
            >
              <TextInput
                style={this.state.errors[2] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ phoneNumber: text })}
                keyboardType="numeric"
                placeholder="Numéro de téléphone *"
                selectTextOnFocus
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"
                onBlur={() => this.resetFocus()}
                onFocus={() => this.setFocus(phoneNumberInput)}
                maxLength={10}
                value={this.state.phoneNumber}
              />
            </View>

            <View style={this.state.focused === mailInput
              ? familinkStyles.itemFocused : familinkStyles.item}
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
                value={this.state.email}
              />
            </View>

            {actionButtons}

          </View>

          <BackButton navigation={navigation} param={PHONEBOOK_SCENE_NAME} />
        </View>
      </TouchableWithoutFeedback>
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
