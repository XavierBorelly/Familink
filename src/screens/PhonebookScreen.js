import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, TouchableHighlight, Image } from 'react-native';
import { CONTACT_SCENE_NAME } from '../apps/ContactApp';
import { HOME_SCENE_NAME } from './HomeScreen';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { showInformativePopin } from '../Popin';
import iconCall from '../../assets/icon_phone.jpg';
import defaultGravatar from '../../assets/icon_defaultGravatar.jpg';
import ContactService from '../service/contactService';
import { labelNoContact, labelLoading } from '../Util';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

const $bgColor = '#F5FCFF';

let lastLetter = '';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $bgColor,
  },
  itemContactContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
  },
  textItemContactContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export default class PhonebookScreen extends Component
{
  // fonction pour pouvoir mettre une lettre e header par groupe d'utilisateur
  // /dont le nom commence par cette lettre
  static indicateur(letter)
  {
    const letterUpper = letter.toUpperCase();

    if (lastLetter !== letterUpper)
    {
      lastLetter = letterUpper;
      return letterUpper;
    }
    return '';
  }

  constructor(props)
  {
    super(props);

    this.state = { contacts: null };
  }

  componentDidMount()
  {
    ContactService.getAllContacts().then((contacts) =>
    {
      this.setState({ contacts });
    });
  }

  navigateToInfo(contact)
  {
    const navigation = this.props.navigation;
    navigation.navigate(CONTACT_SCENE_NAME, { contact });
  }

  // fonction appeller en fonction du rendu voulu (écrant de chargement ou annuaire)
  chargement()
  {
    if (this.state.contacts === null)
    {
      return (
        <View>
          <Text>{labelLoading}</Text>
        </View>
      );
    }
    if (this.state.contacts.length === 0)
    {
      return (
        <View>
          <Text>{labelNoContact}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.contacts}
        renderItem={({ item }) => (
          <View>
            <Text>{PhonebookScreen.indicateur(item.firstName.slice(0, 1))}</Text>
            <TouchableHighlight onPress={() => this.navigateToInfo(item)}>
              <View style={styles.itemContactContainer}>
                <Image source={item.gravatar === null || item.gravatar === '' ? defaultGravatar : { uri: item.gravatar }} style={styles.image} />
                <View style={styles.textItemContactContainer}>
                  <ScrollView horizontal="true">
                    <Text>{item.firstName} {item.lastName}</Text>
                  </ScrollView>
                  <View />
                </View>
                <TouchableHighlight onPress={() => showInformativePopin('call en cours', item.phone)}>
                  <Image style={styles.image} source={iconCall} />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
          </View>)}
        keyExtractor={item => item.phone}
      />
    );
  }

  render()
  {
    lastLetter = '';
    const navigation = this.props.navigation;
    const listContacts = this.chargement();
    return (
      <View >
        <View style={styles.container}>
          <Header hasMenu navigation={navigation} title="Répertoire" />
        </View>


        {listContacts}

        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
