import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const EMERGENCY_CONFIG_SCENE_NAME = 'EMERGNCY_CONFIG_SCENE';

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

export default class EmergencyConfigScreen extends Component
{
  static navigationOptions = {
    title: 'Emergency config',
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Emergency config
        </Text>
      </View>
    );
  }
}
