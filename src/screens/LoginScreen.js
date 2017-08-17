import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const LOGIN_SCENE_NAME = 'LOGIN_SCENE';

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
    drawerLabel: 'Login',
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Login
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
