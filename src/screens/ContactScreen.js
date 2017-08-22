import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import { addContact } from '../actions/contacts.action';

import Header from '../components/Header';
import { PHONEBOOK_SCENE_NAME } from '../apps/PhonebookApp';
import BackButton from '../components/BackButton';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
});

export class ContactScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.add = this.add.bind(this);
  }

  add()
  {
    // check form values and add it
    const mockValues = {
      phone: '0689184191',
      firstName: 'Lester',
      lastName: 'Patterson',
      email: 'necolo@gozliblej.ph',
      profile: 'MEDECIN',
      isFamilinkUser: true,
      isEmergencyUser: false,
    };
    const actionResult = this.props.addContact(mockValues);
    /* eslint-disable */
    alert(`TEST Action Result : ${JSON.stringify(actionResult)}`);
    /* eslint-ensable */
  }

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header hasMenu navigation={navigation} title="Modifier contact" />
        <Button onPress={this.add} title="Ajouter" />
        <BackButton navigation={navigation} param={PHONEBOOK_SCENE_NAME} />
      </View>
    );
  }
}

ContactScreen.propTypes = {
  addContact: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.func.isRequired,
};


// Map your custom actions to dispatcher
function mapDispatchToProps(dispatch)
{
  return {
    addContact: jsonValues => dispatch(addContact(jsonValues)),
  };
}

// connect screen elements to redux object
export default connect(null, mapDispatchToProps)(ContactScreen);
