import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import ProfilePicker from './ProfilePicker';
import { getUser, editUser } from '../WS/WebServiceUser';
import familinkStyles from '../Style';
import { labelInformativePopinTitle, labelUserModified, buttonLabelModification, buttonLabelValidation } from '../Util';
import { checkSurname, checkMail } from '../errors/FamilinkErrors';

let errors = [];

const $labelColor = '#FF0000';

const styles = StyleSheet.create({
  label: {
    color: $labelColor,
    flex: 1,
    width: '80%',
  },
});

export default class UpdateProfil extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { canUpdate: false,
      errors: ['', '', ''],
    };
  }

  componentDidMount()
  {
    this.getMyProfile();
  }

  async getMyProfile()
  {
    const currentUser = getUser().then((response) =>
    {
      this.setState({ name: response.lastName,
        firstName: response.firstName,
        email: response.email,
        profil: response.profile,
      });
    });
    return currentUser;
  }
  /* eslint-disable no-lone-blocks */
  ValidateProfile()
  {
    return (
      <View style={familinkStyles.content}>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            selectTextOnFocus
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#909090"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            editable
            maxLength={15}
          />
        </View>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
            onChangeText={firstName => this.setState({ firstName })}
            selectTextOnFocus
            placeholderTextColor="#909090"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={this.state.firstName}
            editable
            maxLength={15}
          />
        </View>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
            onChangeText={email => this.setState({ email })}
            selectTextOnFocus
            autoCorrect={false}
            underlineColorAndroid="transparent"
            placeholderTextColor="#909090"
            maxLength={50}
            value={this.state.email}
            editable
            keyboardType="email-address"
          />
        </View>
        <ProfilePicker
          selected={this.state.profil}
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
              errors = [];
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
                this.setState({ canUpdate: false });
                editUser(this.state.name, this.state.firstName,
                  this.state.email, this.profilePickerComponent.state.profil).then((response) =>
                {
                  this.setState({ name: response.lastName,
                    firstName: response.firstName,
                    email: response.email,
                    profil: response.profile,
                  });
                });
                showInformativePopin(labelInformativePopinTitle, labelUserModified);
              }
            }
            }
          >
            <Text style={familinkStyles.buttonText}>{buttonLabelValidation}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  EditeProfile()
  {
    return (
      <View style={familinkStyles.content}>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            style={familinkStyles.textInput}
            value={this.state.name}
            underlineColorAndroid="transparent"
            editable={false}
          />
        </View>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={familinkStyles.textInput}
            value={this.state.firstName}
            underlineColorAndroid="transparent"
            editable={false}
          />
        </View>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={familinkStyles.textInput}
            value={this.state.email}
            underlineColorAndroid="transparent"
            editable={false}
          />
        </View>
        <View style={familinkStyles.item}>
          <Text style={styles.label}>
            {this.state.profil}
          </Text>
        </View>

        <View style={familinkStyles.item}>
          <TouchableHighlight
            style={familinkStyles.button}
            onPress={() =>
            {
              this.setState({ canUpdate: true });
            }
            }
          >
            <Text style={familinkStyles.buttonText}>{buttonLabelModification}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render()
  {
    const editRender = this.EditeProfile();
    const validRender = this.ValidateProfile();
    if (this.state.canUpdate === false)
    {
      return (
        <View>
          { editRender }
        </View>
      );
    }
    return (
      <View>
        { validRender }
      </View>
    );
  }
}
