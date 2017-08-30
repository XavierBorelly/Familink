/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import NetInfo, { AppRegistry } from 'react-native';

import ApplicationNavigator from './src/AppNavigator';
import { handleFirstConnectivityChange } from './src/errors/Token';

const familink = () =>
{
  NetInfo.isConnected.fetch().then((isConnected) =>
  {
    NetInfo.isConnected.addEventListener( // faaire l'appel dans index.ios et index.android
      'change',
      handleFirstConnectivityChange,
    );
    handleFirstConnectivityChange(isConnected, props);
  });
  <ApplicationNavigator />;
};

console.ignoredYellowBox = ['Warning:'];

AppRegistry.registerComponent('familink', () => familink);

export default familink;
