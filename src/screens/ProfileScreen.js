import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import MenuIcon from '../../assets/icon_profile.jpg';
import UpdateProfil from '../components/UpdateProfil';

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
    drawerLabel: 'Mon Profil',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };
  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header has Menu navigation={navigation} title="Mon Profil" />
        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
        <UpdateProfil />
      </View>
    );
  }
}
ProfileScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
