import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const SIGNUP_SCENE_NAME = 'SIGNUP_SCENE';

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

export default class SignUpScreen extends Component
{
  static navigationOptions = {
    title: 'Sign Up',
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Sign Up
        </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('DrawerOpen')}
          } title="Open drawer"
        />
      </View>
    );
  }
}
