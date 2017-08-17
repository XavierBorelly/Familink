/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import ApplicationNavigator from './src/AppNavigator';

export default class familink extends Component
{
  render()
  {
    return <ApplicationNavigator />;
  }
}

AppRegistry.registerComponent('familink', () => familink);
