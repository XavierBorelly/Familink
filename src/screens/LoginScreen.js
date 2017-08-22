import React, { Component } from 'react';
import { Button, StyleSheet, Platform, View, TextInput, AsyncStorage } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { SIGNUP_SCENE_NAME } from './SignUpScreen';
import { PASSWORD_RESET_SCENE_NAME } from './PasswordResetScreen';
import { login } from '../WS/WebServiceUser';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

const $bgColor = 'blue';
const $inputBorderColor = '#E0E4CC';
const $inputErrorColor = 'red';
const $whiteColor = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    top: (Platform.OS === 'ios') ? 38 + 20 : 38,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  },
  textInput: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
  },
  button: {
    flex: 1,
    backgroundColor: $inputErrorColor,
    color: $bgColor,
    justifyContent: 'center',
  },
});

export default class LoginScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Déconnection',
    drawerLockMode: 'locked-closed',
  };

  constructor(props)
  {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = { checked: false, user: '', password: null };
  }

  componentWillMount()
  {
    this.getRemember();
  }

  async getRemember()
  {
    try
    {
      await AsyncStorage.getItem('@MonEtat:key').then((etat) =>
      {
        this.setState({ checked: JSON.parse(etat) });
      });
      if (this.state.checked === true)
      {
        await AsyncStorage.getItem('@MonIdentifiant:key').then((identifiant) =>
        {
          this.setState({ user: identifiant });
        });
      }
    }
    catch (error)
    {
      // Error retrieving data
    }
  }

  checkboxCheck()
  {
    this.setState({ checked: !this.state.checked });
  }

  async doConnection()
  {
    const user = this.state.user;
    const password = this.state.password;
    const checked = this.state.checked;
    try
    {
      await AsyncStorage.setItem('@MonEtat:key', JSON.stringify(checked)).bind(this);
    }
    catch (e)
    {
      // Error saving data
    }
    if (checked === true)
    {
      try
      {
        await AsyncStorage.setItem('@MonIdentifiant:key', user).bind(this);
      }
      catch (error)
      {
        // Error saving data
      }
    }
    login(user, password);
    console.log(user);
    console.log(password);
    this.props.navigation.navigate(HOME_SCENE_NAME);
  }

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Connexion" />
        <View style={styles.content}>
          <View style={styles.cell}>
            <TextInput
              style={styles.textInput}
              onChangeText={user => this.setState({ user })}
              keyboardType="numeric"
              placeholder="Numéro de téléphone"
              defaultValue={this.state.user}
              ref={(input) =>
              {
                this.textInput = input;
              }}
              maxLength={10}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              keyboardType="numeric"
              placeholder="Mot de passe"
              secureTextEntry
              maxLength={4}
            />
          </View>
          <View style={styles.cell}>
            <ListItem onPress={() => this.checkboxCheck()}>
              <CheckBox checked={this.state.checked} />
              <Body>
                <Text>Se souvenir de Moi</Text>
              </Body>
            </ListItem>
            <Button
              style={styles.button}
              onPress={() =>
              {
                this.doConnection();
              }
              }
              title="Se connecter"
            />
          </View>
          <View style={styles.cell}>
            <Button
              style={styles.button}
              onPress={() =>
              {
                navigation.navigate(SIGNUP_SCENE_NAME);
              }
              }
              title="S'inscrire"
            />
            <Button
              style={styles.button}
              onPress={() =>
              {
                navigation.navigate(PASSWORD_RESET_SCENE_NAME);
              }
              }
              title="Mot de passe oublié ?"
            />
          </View>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
