// REMOVE IT
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { MainStore } from '../MainStore';

import Screen from '../screens/PhonebookScreen';
import MenuIcon from '../../assets/icon_phonebook.jpg';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
});

export default class PhonebookApp extends Component
{
  static navigationOptions = {
    drawerLabel: 'Phonebook',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    return (
      <Provider store={MainStore}>
        <Screen navigation={this.props.navigation} />
      </Provider>
    );
  }
}

PhonebookApp.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
