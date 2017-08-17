import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

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

export default class HomeScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: (<Image source={MenuIcon}  style={[styles.icon]}/>),
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Home
        </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('SIGNUP_SCENE');
            //this.props.navigation.navigate('DrawerOpen')
            }
          }
title="Open drawer"
        />
      </View>
    );
  }
}
