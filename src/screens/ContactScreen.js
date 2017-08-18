import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import { PHONEBOOK_SCENE_NAME } from './PhonebookScreen';
import BackButton from '../components/BackButton';

export const CONTACT_SCENE_NAME = 'CONTACT_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
});

export default class ContactScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Contact detail',
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Modifier contact" />
        <BackButton navigation={navigation} param={PHONEBOOK_SCENE_NAME} />
      </View>
    );
  }
}

ContactScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
