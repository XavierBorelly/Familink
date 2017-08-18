import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
});

export default class PhonebookScreen extends Component
{
  static navigationOptions = {
    title: 'Phonebook',
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
