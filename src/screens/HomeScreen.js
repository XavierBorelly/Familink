import React, { Component } from 'react';
import { Image, Button, StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import { PROFILE_SCENE_NAME } from './ProfileScreen';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import MenuIcon from '../../assets/icon_home.jpg';

import { login, editUser, getProfil } from '../WS/WebServiceUser'

import { DeleteTokenFromBDD } from '../BDD/Token';

export const HOME_SCENE_NAME = 'HOME_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default class HomeScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Accueil',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header hasMenu navigation={navigation} title="Menu connecté" />
        <Button
          onPress={() =>
          {
            navigation.navigate(PROFILE_SCENE_NAME);
          }
          }
          title="Mon profil"
        />
        <Button
          onPress={() =>
          {
            navigation.navigate(PHONEBOOK_SCENE_NAME);
          }
          }
          title="Répertoire"
        />

        <Button
          onPress={() =>
          {

              login('0606060606', '1234');
          }
          }
          title="log"
        />

        <Button
          onPress={() =>
          {
            editUser('xavier','borelly','borelly.xavier@gmail.com','SENIOR', navigation);
          }
          }
          title="edit"
        />
        <Button
          onPress={() =>
          {
            console.log(getProfil());
          }
          }
          title="profil"
        />


        <Button
          onPress={() =>
          {
            DeleteTokenFromBDD();
          }
          }
          title="logout"
        />


      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
