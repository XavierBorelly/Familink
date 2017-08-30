import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';
import ProfilePicker from './ProfilePicker';
import { getUser, editUser } from '../WS/WebServiceUser';
import familinkStyles from '../Style';
import { labelInformativePopinTitle, labelUserModified, buttonLabelModification, buttonLabelValidation } from '../Util';
import { checkSurname, checkMail } from '../errors/FamilinkErrors';

export default class UpdateProfil extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      editing: false,
      errors: ['', ''],
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

  render()
  {
    const buttonText = this.state.editing ?
      <Text style={familinkStyles.buttonText}>{buttonLabelValidation}</Text> :
      <Text style={familinkStyles.buttonText}>{buttonLabelModification}</Text>;

    return (
      <View style={familinkStyles.content}>

        <View style={familinkStyles.item}>
          <Text style={familinkStyles.legend}>
            {'Nom'}
          </Text>
          <TextInput
            style={familinkStyles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            underlineColorAndroid="transparent"
            editable={this.state.editing}
            maxLength={15}
          />
        </View>

        <View style={familinkStyles.item}>
          <Text style={familinkStyles.legend}>
            {'Prénom'}
          </Text>
          <TextInput
            style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            underlineColorAndroid="transparent"
            editable={this.state.editing}
            maxLength={15}
          />
        </View>

        <View style={familinkStyles.item}>
          <Text style={familinkStyles.legend}>
            {'Mail'}
          </Text>
          <TextInput
            style={this.state.errors[1] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            underlineColorAndroid="transparent"
            editable={this.state.editing}
            keyboardType="email-address"
            maxLength={50}
          />
        </View>

        <View style={familinkStyles.item}>
          <Text style={familinkStyles.legend}>
            {'Profil'}
          </Text>
          <ProfilePicker
            selected={this.state.profil}
            editable={this.state.editing}
            ref={(profilePickerComponent) =>
            {
              this.profilePickerComponent = profilePickerComponent;
            }
            }
          />
        </View>

        <View style={familinkStyles.item}>
          <TouchableHighlight
            style={familinkStyles.button}
            onPress={() =>
            {
              if (this.state.editing)
              {
                const errorsArray = [];
                errorsArray.push(checkSurname(this.state.firstName));
                errorsArray.push(checkMail(this.state.email));
                this.setState({ errors: errorsArray });

                let thereIsErrors = false;

                for (let i = 0; i < errorsArray.length; i += 1)
                {
                  if (errorsArray[i] !== '')
                  {
                    showInformativePopin(errorPopinTitle, errorsArray[i]);
                    thereIsErrors = true;
                    break;
                  }
                }
                if (!thereIsErrors)
                {
                  this.setState({ editing: false });
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
              else
              {
                this.setState({ editing: true });
              }
            }
            }
          >
            {buttonText}
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}
