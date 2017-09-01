import React, { Component } from 'react';
import { View, Keyboard, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import familinkStyles from '../Style';
import { addContact } from '../actions/contacts.action';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import Gravatar from '../components/Gravatar';
import Header from '../components/Header';
import { checkRequiredStringValue, checkPhoneNumber, checkMail } from '../errors/FamilinkErrors';
import { errorPopinTitle, lastnameRequired, surnameRequired } from '../errors/ErrorStrings';
import Contact from '../models/Contact';
import ContactService from '../service/contactService';


import { showInformativePopin, showDeleteContactPopIn } from '../Popin';
import { labelContactUpdatedSuccess, labelContactDeletedSuccess,
  labelContactCreatedFail, labelContactUpdatedFail, labelContactDeletedFail,
  buttonLabelUpdate, buttonLabelDelete, labelInformativePopinTitle, labelContactCreatedSuccess,
  textLabelFamilink, textLabelUrgency, buttonLabelValidation, headerModifyContact,
  headerContactCreate, placeholderFirstnameMandatory, placeholderNameMandatory,
  placeholderPhoneNumberMandatory, placeholderEmailMandatory } from '../Util';


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

    const currentId = (contact && contact.id != null) ? contact.id : null;

    this.state = {
      mode: (currentId != null) ? Mode.UPDATE : Mode.CREATE,
      focused: 'null',
      id: currentId,
      gravatar: contact.gravatar || '',
      lastName: contact.lastName || '',
      firstName: contact.firstName || '',
      phoneNumber: contact.phoneNumber || '',
      email: contact.email || '',
      isFamilinkUser: contact.isFamilinkUser || false,
      isEmergencyUser: contact.isEmergencyUser || false,
      errors: ['', '', '', ''],
    };

    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
        <View style={[familinkStyles.itemEditContact]}>
          {this.state.isFamilinkUser &&
          <View style={[familinkStyles.containerTag, familinkStyles.centerElement,
            familinkStyles.textFamilink]}
          >
            <Text style={familinkStyles.textTag}>{textLabelFamilink}</Text>
          </View>
          }
          {this.state.isEmergencyUser &&
          <View style={[familinkStyles.containerTag, familinkStyles.centerElement,
            familinkStyles.textUrgency]}
          >
            <Text style={familinkStyles.textTag}>{textLabelUrgency}</Text>
          </View>
          }
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
        <View>
          <View style={[familinkStyles.itemEditContact]}>
            <TouchableHighlight
              style={[familinkStyles.button]}
              onPress={this.update}
            >
              <Text style={familinkStyles.buttonText}>{buttonLabelUpdate}</Text>
            </TouchableHighlight>
          </View>

          <View style={[familinkStyles.itemEditContact]}>
            <TouchableHighlight
              style={[familinkStyles.button]}
              onPress={() => showDeleteContactPopIn(this.delete)}
            >
              <Text style={familinkStyles.buttonText}>{buttonLabelDelete}</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }

    // Creation mode
    return (
      <View style={[familinkStyles.itemEditContact]}>
        <TouchableHighlight
          style={[familinkStyles.button]}
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
      const newContact = new Contact(state.id, state.phoneNumber, state.firstName,
        state.lastName, state.email, null, null, false, false);

      ContactService.addContact(newContact).then((createResponse) =>
      {
        // Seul le succès est gére (le webservice renvoie vers la page login en cas d'échec)
        if (createResponse.ok)
        {
          showInformativePopin(labelInformativePopinTitle, labelContactCreatedSuccess);
          props.navigation.navigate(PHONEBOOK_SCENE_NAME);
        }
        else
        {
          showInformativePopin(labelInformativePopinTitle, labelContactCreatedFail);
        }
      });
    }
    else
    {
      this.setState({ errors: errorArray });
    }
  }

  update()
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
      const updatedContact = new Contact(state.id, state.phoneNumber, state.firstName,
        state.lastName, state.email, null, null, state.isFamilinkUser, state.isEmergencyUser);

      ContactService.updateContact(updatedContact).then((updateResponse) =>
      {
        // Seul le succès est gére (le webservice renvoie vers la page login en cas d'échec)
        if (updateResponse.ok)
        {
          showInformativePopin(labelInformativePopinTitle, labelContactUpdatedSuccess);
          props.navigation.navigate(PHONEBOOK_SCENE_NAME);
        }
        else
        {
          showInformativePopin(labelInformativePopinTitle, labelContactUpdatedFail);
        }
      });
    }
    else
    {
      this.setState({ errors: errorArray });
    }
  }

  delete()
  {
    const state = this.state;
    ContactService.deleteContact(state.id).then((deleteResponse) =>
    {
      if (deleteResponse.ok)
      {
        showInformativePopin(labelInformativePopinTitle, labelContactDeletedSuccess);
        this.props.navigation.navigate(PHONEBOOK_SCENE_NAME);
      }
      else
      {
        showInformativePopin(labelInformativePopinTitle, labelContactDeletedFail);
      }
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

    const tagView = this.getTagView();
    const actionButtons = this.getActionButtons();

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={familinkStyles.container}>
          <Header
            navigation={navigation}
            goBackTo={PHONEBOOK_SCENE_NAME}
            title={
              (this.state.mode === Mode.UPDATE ? headerModifyContact : headerContactCreate)
            }
          />
          <View style={familinkStyles.content}>

            <View style={[familinkStyles.itemEditContact, familinkStyles.centerElement]}>
              <Gravatar gravatarUrl={this.state.gravatar} email={this.state.email} size={64} />
            </View>

            <View style={this.state.focused === firstNameInput ?
              familinkStyles.itemEditContactFocused : familinkStyles.itemEditContact}
            >
              <TextInput
                style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ firstName: text })}
                placeholder={placeholderFirstnameMandatory}
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

            <View style={this.state.focused === lastNameInput ?
              familinkStyles.itemEditContactFocused : familinkStyles.itemEditContact}
            >
              <TextInput
                style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ lastName: text })}
                placeholder={placeholderNameMandatory}
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

            {tagView}

            <View style={this.state.focused === phoneNumberInput ?
              familinkStyles.itemEditContactFocused : familinkStyles.itemEditContact}
            >
              <TextInput
                style={this.state.errors[2] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ phoneNumber: text })}
                keyboardType="numeric"
                placeholder={placeholderPhoneNumberMandatory}
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

            <View style={this.state.focused === mailInput ?
              familinkStyles.itemEditContactFocused : familinkStyles.itemEditContact}
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
                value={this.state.email}
              />
            </View>

            {actionButtons}

          </View>
          <View style={familinkStyles.bottomBar} />
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
