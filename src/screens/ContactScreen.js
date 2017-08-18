import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import { PHONEBOOK_SCENE_NAME } from './PhonebookScreen';

export const CONTACT_SCENE_NAME = 'CONTACT_SCENE';

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
});

export default class ContactScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Contact detail',
  };

  render()
  {
    let navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Modifier contact" />
        <Button onPress={() => { navigation.navigate(PHONEBOOK_SCENE_NAME)} } title="Valider contact" />
      </View>
    );
  }
}
