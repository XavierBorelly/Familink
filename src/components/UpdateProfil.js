import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import ProfilePicker from './ProfilePicker';
import { getUser, editUser } from '../WS/WebServiceUser';

const $inputBorderColor = '#E0E4CC';
const $lightgrayColor = '#EEEEEE';
const $whiteColor = '#FFFFFF';
const $labelColor = '#FF0000';
const $validateColor = '#E37A08';

let errors = [];

const styles = StyleSheet.create({
  contentUpdate: {
    backgroundColor: $lightgrayColor,
    flex: 0.8,
    width: '80%',
  },
  contentValidate: {
    backgroundColor: $validateColor,
    flex: 0.8,
    width: '80%',
  },
  cell: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  textinput: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
    width: '80%',
  },
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
    this.state = { canUpdate: false };
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
      <View style={styles.contentValidate}>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            editable
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            editable
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            editable
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

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
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
              }
            }
            }
            title="Valider"
            color="#FF0000"
            accessibilityLabel="Valider"
          />
        </View>
      </View>
    );
  }

  EditeProfile()
  {
    return (
      <View style={styles.contentUpdate}>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Nom'}
          </Text>
          <TextInput
            style={styles.textinput}
            value={this.state.name}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Prénom'}
          </Text>
          <TextInput
            style={styles.textinput}
            value={this.state.firstName}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {'Mail'}
          </Text>
          <TextInput
            style={styles.textinput}
            value={this.state.email}
            editable={false}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>
            {this.state.profil}
          </Text>
        </View>

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
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
                this.setState({ canUpdate: true });
              }
            }
            }
            title="Modifier"
            color="#FF0000"
            accessibilityLabel="Modifier"
          />
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
