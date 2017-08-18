import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import MenuIcon from '../../assets/icon_profile.jpg';
import BackButton from '../components/BackButton';

export const PROFILE_SCENE_NAME = 'PROFILE_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default class ProfileScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mon profil" />
        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
