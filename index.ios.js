import React from 'react';
import { AppRegistry } from 'react-native';

import ApplicationNavigator from './src/AppNavigator';

const familink = () => <ApplicationNavigator />;

console.ignoredYellowBox = ['Warning:'];

AppRegistry.registerComponent('familink', () => familink);

export default familink;
