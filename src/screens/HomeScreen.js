import React, { Component } from 'react';
import { Image, Button, StyleSheet, View } from 'react-native';

import Contact from '../../modele/contact'
import { editContactToDBB, saveContactToDBB, deleteContactToDBB, getAllContactsFromDBB, saveAllContactsToDBB, deleteAllContactsToDBB } from '../BDD/contact';

import Header from '../components/Header';
import { PROFILE_SCENE_NAME } from './ProfileScreen';
import { PHONEBOOK_SCENE_NAME } from './PhonebookScreen';
import MenuIcon from '../../assets/icon_home.jpg';

export const HOME_SCENE_NAME = 'HOME_SCENE';

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

export default class HomeScreen extends Component
{
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: (<Image source={MenuIcon} style={[styles.icon]} />),
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
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header hasMenu navigation={navigation} title="Menu connecté" />
        <Button
          onPress={() =>
          {
            navigation.navigate(PROFILE_SCENE_NAME);
          }
          }
          title="Mon profil"
        />
        <Button
          onPress={() =>
          {
            navigation.navigate(PHONEBOOK_SCENE_NAME);
          }
          }
          title="Répertoire"/>
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
            title='editBis'/>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: React.PropTypes.func.isRequired,
};
