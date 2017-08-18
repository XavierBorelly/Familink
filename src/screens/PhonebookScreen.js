import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { CONTACT_SCENE_NAME } from './ContactScreen';
import MenuIcon from '../../assets/icon_phonebook.jpg';
import BackButton from '../components/BackButton';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

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

export default class PhonebookScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Phonebook',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header hasMenu navigation={navigation} title="Répertoire" />
        <Button
          onPress={() =>
          {
            navigation.navigate(CONTACT_SCENE_NAME);
          }
          }
          title="Modifier contact"
        />
        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
