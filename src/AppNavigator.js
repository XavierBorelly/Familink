import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen, { HOME_SCENE_NAME } from './screens/HomeScreen';
import EmergencyConfigScreen, { EMERGENCY_CONFIG_SCENE_NAME } from './screens/EmergencyConfigScreen';
import PhonebookScreen, { PHONEBOOK_SCENE_NAME } from './screens/PhonebookScreen';
import ProfileScreen, { PROFILE_SCENE_NAME } from './screens/ProfileScreen';

const stackNavigatorConfig = {};

stackNavigatorConfig[HOME_SCENE_NAME] = {
  screen: HomeScreen,
};

stackNavigatorConfig[EMERGENCY_CONFIG_SCENE_NAME] = {
  screen: EmergencyConfigScreen,
};

stackNavigatorConfig[PHONEBOOK_SCENE_NAME] = {
  screen: PhonebookScreen,
};

stackNavigatorConfig[PROFILE_SCENE_NAME] = {
  screen: ProfileScreen,
};

const ApplicationNavigator = StackNavigator(stackNavigatorConfig, {
  initialRouteName: HOME_SCENE_NAME,
});

export default () => <ApplicationNavigator />;

