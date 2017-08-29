// REMOVE IT
import React, { Component } from 'react';
import { Image } from 'react-native';

import { Provider } from 'react-redux';
import { MainStore } from '../MainStore';

import Screen from '../screens/PhonebookScreen';
import MenuIcon from '../../assets/icon_phonebook.png';
import familinkStyles from '../Style';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

export default class PhonebookApp extends Component
{
  static navigationOptions = {
    drawerLabel: 'Contacts',
    drawerIcon: (<Image source={MenuIcon} style={[familinkStyles.burgerMenuIcon]} />),
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
