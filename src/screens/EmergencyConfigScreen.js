import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import MenuIcon from '../../assets/icon_emergency_config.jpg';

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
  icon: {
    width: 48,
    height: 48,
  },
});

export default class EmergencyConfigScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Emergency config',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]}/>),
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
