import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import MenuIcon from '../../assets/icon_emergency_config.jpg';
import BackButton from '../components/BackButton';
import { PROFILE_SCENE_NAME } from './ProfileScreen';

export const EMERGENCY_CONFIG_SCENE_NAME = 'EMERGENCY_CONFIG_SCENE';

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

export default class EmergencyConfigScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Emergency config',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Configuration d'urgence" />
        <BackButton navigation={navigation} param={PROFILE_SCENE_NAME} />
      </View>
    );
  }
}

EmergencyConfigScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
