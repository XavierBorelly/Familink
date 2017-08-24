import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
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
});
export default class SignUpScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Mon Profil',
  };
  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Mon Profil" />
        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
        <UpdateProfil />
      </View>
    );
  }
}
SignUpScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
