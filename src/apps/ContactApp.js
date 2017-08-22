// REMOVE IT
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { MainStore } from '../MainStore';

import Screen from '../screens/ContactScreen';

export const CONTACT_SCENE_NAME = 'CONTACT_SCENE';

export default class ContactApp extends Component
{
  static navigationOptions = {
    drawerLabel: 'Contact detail',
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

ContactApp.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
