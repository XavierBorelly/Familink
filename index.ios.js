import React from 'react';
import { NetInfo, AppRegistry } from 'react-native';

import ApplicationNavigator from './src/AppNavigator';
import { handleFirstConnectivityChange } from './src/errors/Token';

const familink = () =>
{
  NetInfo.isConnected.addEventListener( // faaire l'appel dans index.ios et index.android
    'change',
    handleFirstConnectivityChange,
  );
  NetInfo.isConnected.fetch().then((isConnected) =>
  {
    handleFirstConnectivityChange(isConnected);
  });
  return <ApplicationNavigator />;
};

console.ignoredYellowBox = ['Warning:'];

AppRegistry.registerComponent('familink', () => familink);

export default familink;
