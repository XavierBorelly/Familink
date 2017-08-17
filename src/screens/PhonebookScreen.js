import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import MenuIcon from '../../assets/icon_phonebook.jpg';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default class PhonebookScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Phonebook',
    drawerIcon: (<Image source={MenuIcon}  style={[styles.icon]}/>),
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Phonebook
        </Text>
      </View>
    );
  }
}
