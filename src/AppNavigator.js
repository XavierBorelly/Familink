import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import HomeScreen, { HOME_SCENE_NAME } from './screens/HomeScreen';
import EmergencyConfigScreen, { EMERGENCY_CONFIG_SCENE_NAME } from './screens/EmergencyConfigScreen';
import PhonebookScreen, { PHONEBOOK_SCENE_NAME } from './screens/PhonebookScreen';
import ProfileScreen, { PROFILE_SCENE_NAME } from './screens/ProfileScreen';
import LoginScreen, { LOGIN_SCENE_NAME } from './screens/LoginScreen';
import SignUpScreen, { SIGNUP_SCENE_NAME } from './screens/SignUpScreen';
import PasswordResetScreen, { PASSWORD_RESET_SCENE_NAME } from './screens/PasswordResetScreen';


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

stackNavigatorConfig[LOGIN_SCENE_NAME] = {
  screen: LoginScreen,
};

stackNavigatorConfig[SIGNUP_SCENE_NAME] = {
  screen: SignUpScreen,
};

stackNavigatorConfig[PASSWORD_RESET_SCENE_NAME] = {
  screen: PasswordResetScreen,
};

const ApplicationNavigator = DrawerNavigator(stackNavigatorConfig, {
  initialRouteName: HOME_SCENE_NAME,
});

export default () => <ApplicationNavigator />;

