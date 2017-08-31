import React, { Component } from 'react';
import { TextInput, View, Text, TouchableHighlight, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { forgotPassword } from '../WS/WebServiceUser';
import Header from '../components/Header';
import { checkForgotPassword } from '../errors/FamilinkErrors';
import { LOGIN_SCENE_NAME } from './LoginScreen';
import { errorPopinTitle } from '../errors/ErrorStrings';
import BackButton from '../components/BackButton';
import familinkStyles from '../Style';
import { showInformativePopin } from '../Popin';
import { buttonLabelValidateForgotPassword, LabelConfirmForgotPassword } from '../Util';


export const PASSWORD_RESET_SCENE_NAME = 'PASSWORD_RESET_SCENE';

export default class PasswordResetScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Password reset',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.state = {
      phone: null,
      errors: [''],
    };
  }


  render()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={familinkStyles.container}>
          <Header navigation={navigation} title="Mot de passe oublié" />

          <View style={familinkStyles.contentForgotPassword}>
            <View style={familinkStyles.itemForgotPassword}>
              <TextInput
                style={this.state.errors[0] === '' ? familinkStyles.textInput : familinkStyles.textInputError}
                onChangeText={text => this.setState({ phone: text })}
                keyboardType="numeric"
                placeholder="Numéro de téléphone"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#909090"

                maxLength={10}
              />
            </View>
            <View style={familinkStyles.itemForgotPassword}>
              <TouchableHighlight
                style={familinkStyles.button}
                onPress={() =>
                {
                  forgotPassword(this.state.phone).then((response) =>
                  {
                    const errors = [];
                    errors.push(checkForgotPassword(response));
                    this.setState({ errors });

                    let thereIsErrors = false;
                    for (let i = 0; i < errors.length; i += 1)
                    {
                      if (errors[i] !== '')
                      {
                        // PopIn d'erreur
                        showInformativePopin(errorPopinTitle, errors[i]);
                        thereIsErrors = true;
                      }
                    }
                    if (!thereIsErrors)
                    {
                      showInformativePopin('changement mot de passe', LabelConfirmForgotPassword);
                      navigation.navigate(LOGIN_SCENE_NAME);
                    }
                  });
                }
                }
              >
                <Text style={familinkStyles.buttonText}>{buttonLabelValidateForgotPassword}</Text>
              </TouchableHighlight>
            </View>
          </View>
          <BackButton navigation={navigation} param={LOGIN_SCENE_NAME} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

PasswordResetScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
