import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import MenuIcon from '../../assets/icon_profile.png';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import UpdateProfil from '../components/UpdateProfil';
import familinkStyles from '../Style';

export const PROFILE_SCENE_NAME = 'PROFILE_SCENE';

export default class ProfileScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Mon Profil',
    drawerIcon: (<Image source={MenuIcon} style={[familinkStyles.burgerMenuIcon]} />),
  };
  render()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={familinkStyles.container}>
          <Header hasMenu navigation={navigation} title="Mon Profil" />
          <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
          <UpdateProfil />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
ProfileScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
