import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const PASSWORD_RESET_SCENE_NAME = 'PASSWORD_RESET_SCENE';

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

export default class PasswordResetScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Password reset',
  };

  render()
  {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Password reset
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
