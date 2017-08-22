import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../components/Header';
import { HOME_SCENE_NAME } from './HomeScreen';
import { CONTACT_SCENE_NAME } from '../apps/ContactApp';

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
});

// eslint-disable-next-line react/prefer-stateless-function
export class PhonebookScreen extends Component
{
  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header hasMenu navigation={navigation} title="Répertoire" />
        <Text>Contacts in store : {this.props.contactsList.length} </Text>
        <Button
          onPress={() =>
          {
            navigation.navigate(CONTACT_SCENE_NAME);
          }
          }
          title="Ajouter contact"
        />
        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
  contactsList: React.PropTypes.func.isRequired,
};

// Map props from redux state
function mapStateToProps(state)
{
  return {
    contactsList: state.contactsReducer.contactsList,
  };
}

// connect screen elements to redux object
export default connect(mapStateToProps, null)(PhonebookScreen);
