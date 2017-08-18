import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Contact from '../../modele/contact'

import { editContactToDBB, saveContactToDBB, deleteContactToDBB, getAllContactsFromDBB, saveAllContactsToDBB, deleteAllContactsToDBB } from '../BDD/contact';

export const HOME_SCENE_NAME = 'HOME_SCENE';

const $bgColor = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class HomeScreen extends Component
{
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
        super(props);

        this.state = {
            contact : null
        };

    }

  look(){
    getAllContactsFromDBB();
  }

  clearAll(){
    deleteAllContactsToDBB();
  }

  clear(){
    deleteContactToDBB('07');
  }

  edit(){
    const phone = new Contact('06', 'test54', null, null, null, null);
    editContactToDBB('06', phone);
  }


  editBis(){
    const phone = new Contact('05', null, null, null, null, null);
    editContactToDBB('09', phone);
  }

  add(){
    const phone = new Contact('08', null, null, null, null, null);
    saveContactToDBB(phone);
  }

  addAll(){
    const phones = [
            new Contact('06', null, null, null, null, null),
            new Contact('07', null, null, null, null, null),
            new Contact('09', null, null, null, null, null),
        ];
    saveAllContactsToDBB(phones);
  }

  render()
  {
    console.log(this.state.contact);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Screen : Home
        </Text>
        <Button
          onPress={this.look}
          title='look'
        />
        <Button
          onPress={this.clearAll}
          title='clearAll'
        />
        <Button
          onPress={this.clear}
          title='clear'
        />
        <Button
          onPress={this.add}
          title='add'
        />
        <Button
          onPress={this.addAll}
          title='addAll'
        />
        <Button
          onPress={this.edit}
          title='edit'
        />
        <Button
          onPress={this.editBis}
          title='editBis'
        />
      </View>
    );
  }
}
