import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import MenuIcon from '../../assets/icon_profile.jpg';

export const PROFILE_SCENE_NAME = 'PROFILE_SCENE';

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

export default class ProfileScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: (<Image source={MenuIcon}  style={[styles.icon]}/>),
  };

  render()
  {
    let navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mon profil" />
        <Button onPress={() => { navigation.navigate(HOME_SCENE_NAME)} } title="Retour au menu connecté" />
      </View>
    );
  }
}
