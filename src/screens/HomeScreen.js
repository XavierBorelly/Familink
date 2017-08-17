import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import { PROFILE_SCENE_NAME } from './ProfileScreen';
import { PHONEBOOK_SCENE_NAME } from './PhonebookScreen';
import MenuIcon from '../../assets/icon_home.jpg';

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
    drawerLabel: 'Home',
    drawerIcon: (<Image source={MenuIcon}  style={[styles.icon]}/>),
  };

  render()
  {
    let navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Menu connecté" />

        <Button onPress={() => { navigation.navigate(PROFILE_SCENE_NAME) } } title="Mon profil" />
        <Button onPress={() => { navigation.navigate(PHONEBOOK_SCENE_NAME) } } title="Répertoire" />
      </View>
    );
  }
}