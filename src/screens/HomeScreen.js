import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, StyleSheet, View, Button } from 'react-native';
import Header from '../components/Header';
import { PROFILE_SCENE_NAME } from './ProfileScreen';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import MenuIcon from '../../assets/icon_home.jpg';
import { familinkStyles } from '../Style';
import { getAllContacts } from '../WS/WebServiceContact';
import { DeleteTokenFromBDD } from '../BDD/Token';

export const HOME_SCENE_NAME = 'HOME_SCENE';

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
});

export default class HomeScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Accueil',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={familinkStyles.container}>
        <Header hasMenu navigation={navigation} title="Menu connecté" />
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

          <View style={familinkStyles.item} />

          <View style={familinkStyles.item}>
            <TouchableHighlight
              style={familinkStyles.button}
              onPress={() =>
              {
                navigation.navigate(PHONEBOOK_SCENE_NAME);
              }
              }
            >
              <Text style={familinkStyles.buttonText}>Répertoire</Text>
            </TouchableHighlight>
          </View>
        </View>      
        <Button
          onPress={() =>
          {
            getAllContacts().then((contacts) =>
          {
            console.log(contacts);
          });
          }
          }
          title="getContact"
        />

        <Button
          onPress={() =>
          {
            DeleteTokenFromBDD();
          }
          }
          title="logout"
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
