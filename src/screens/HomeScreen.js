import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import Header from '../components/Header';
import { PROFILE_SCENE_NAME } from './ProfileScreen';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import MenuIcon from '../../assets/icon_home.png';
import familinkStyles from '../Style';
import { headerHome, headerContact} from '../Util';

export const HOME_SCENE_NAME = 'HOME_SCENE';

export default class HomeScreen extends Component
{
  static navigationOptions = {
    drawerLabel: headerHome,
    drawerIcon: (<Image source={MenuIcon} style={[familinkStyles.burgerMenuIcon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={familinkStyles.container}>
        <Header
          navigation={navigation}
          title={headerHome}
          homePage
        />
        <View style={familinkStyles.content}>
          <View style={familinkStyles.item}>
            <TouchableHighlight
              style={familinkStyles.button}
              onPress={() =>
              {
                navigation.navigate(PROFILE_SCENE_NAME);
              }
              }
            >
              <Text style={familinkStyles.buttonText}>Mon profil</Text>
            </TouchableHighlight>
          </View>

          <View style={familinkStyles.item}>
            <TouchableHighlight
              style={familinkStyles.button}
              onPress={() =>
              {
                navigation.navigate(PHONEBOOK_SCENE_NAME);
              }
              }
            >
              <Text style={familinkStyles.buttonText}>{headerContact}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
