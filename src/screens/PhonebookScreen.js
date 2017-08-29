import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import familinkStyles from '../Style';
import { CONTACT_SCENE_NAME } from '../apps/ContactApp';
import { HOME_SCENE_NAME } from './HomeScreen';
import BackButton from '../components/BackButton';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { showInformativePopin } from '../Popin';
import iconCall from '../../assets/icon_phone.png';
import defaultGravatar from '../../assets/icon_defaultGravatar.jpg';
import ContactService from '../service/contactService';
import { labelNoContact, labelLoading } from '../Util';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

let currentLandmarkLetter = '';

export default class PhonebookScreen extends Component
{
  // fonction pour pouvoir mettre une lettre e header par groupe d'utilisateur
  // /dont le nom commence par cette lettre
  static getLandmarkLetter(letter)
  {
    const letterUpper = letter.toUpperCase();

    if (currentLandmarkLetter !== letterUpper)
    {
      currentLandmarkLetter = letterUpper;
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
  renderListContacts()
  {
    if (this.state.contacts === null)
    {
      return (
        <View style={familinkStyles.itemContactContainer}>
          <Text style={familinkStyles.textContact}>{labelLoading}</Text>
        </View>
      );
    }
    if (this.state.contacts.length === 0)
    {
      return (
        <Text style={familinkStyles.textContact}>{labelNoContact}</Text>
      );
    }
    return (
      <FlatList
        data={this.state.contacts}
        renderItem={({ item }) => (
          <View>
            <Text style={familinkStyles.abecedaire} >
              {PhonebookScreen.getLandmarkLetter(item.firstName.slice(0, 1))}
            </Text>
            <TouchableHighlight onPress={() => this.navigateToInfo(item)}>

              <View style={familinkStyles.itemContactContainer}>
                <Image source={item.gravatar === null || item.gravatar === '' ? defaultGravatar : { uri: item.gravatar }} style={familinkStyles.imageContact} />
                <View style={familinkStyles.item}>
                  <View style={familinkStyles.textItemContactContainer}>
                    <Text style={familinkStyles.textContact}>{item.firstName} {item.lastName}</Text>
                  </View>
                  <View style={familinkStyles.textItemContactContainer}>
                    <Text style={item.isFamilinkUser ? familinkStyles.textFamilink : ''}>{item.isFamilinkUser ? 'Familink' : ''} </Text>
                    <Text style={item.isEmergencyUser ? familinkStyles.textUrgency : ''}>{item.isEmergencyUser ? 'Urgence' : ''}</Text>
                  </View>
                </View>
                <TouchableHighlight onPress={() => showInformativePopin('call en cours', item.phone)}>
                  <Image style={familinkStyles.imageContact} source={iconCall} />
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
    currentLandmarkLetter = '';
    const navigation = this.props.navigation;
    const listContacts = this.renderListContacts();
    return (
      <View style={familinkStyles.container}>
        <Header hasMenu navigation={navigation} title="Répertoire" />

        <View style={familinkStyles.contentList}>
          <View style={familinkStyles.contentButtonAddContact}>
            <SearchBar />
            <TouchableHighlight
              style={familinkStyles.buttonAddContact}
              onPress={() =>
              {
                navigation.navigate(CONTACT_SCENE_NAME, { id: 0 });
              }
              }
            >
              <Text style={familinkStyles.buttonAddContactText}> + </Text>
            </TouchableHighlight>
          </View>
          {listContacts}
        </View>

        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
