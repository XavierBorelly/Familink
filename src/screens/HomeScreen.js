import React, { Component } from 'react';
import {login} from '../WS/WebService';
import { StyleSheet, Text, View } from 'react-native';

export const HOME_SCENE_NAME = 'HOME_SCENE';

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

export default class HomeScreen extends Component
{
  static navigationOptions = {
    title: 'Home',
  };

  render()
  {
    login("0606060606", "1234")
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Home
        </Text>
      </View>
    );
  }
}
