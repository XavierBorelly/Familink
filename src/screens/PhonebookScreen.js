import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import _ from 'lodash';
import familinkStyles from '../Style';
import { CONTACT_SCENE_NAME } from '../apps/ContactApp';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { showInformativePopin } from '../Popin';
import iconCall from '../../assets/icon_phone.png';
import ContactService from '../service/ContactService';
import { labelNoContact, labelLoading, headerContact, textLabelUrgency, textLabelFamilink, labelPopInCall } from '../Util';
import Gravatar from '../components/Gravatar';

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
        <Container>
          <Content style={familinkStyles.centerElement}>
            <Text style={familinkStyles.textContact}>{labelLoading}</Text>
            <Spinner color="#FB8C00" />
          </Content>
        </Container>
      );
    }
    if (this.state.contacts.length === 0)
    {
      return (
        <Text style={familinkStyles.textContact}>{labelNoContact}</Text>
      );
    }
    const contactsFiltre = _.filter(this.state.contacts, this.state.filterList);
    return (
      <FlatList
        data={contactsFiltre}
        renderItem={({ item }) => (
          <View>
            <Text style={familinkStyles.abecedaire} >
              {PhonebookScreen.getLandmarkLetter(item.firstName.slice(0, 1))}
            </Text>
            <TouchableHighlight onPress={() => this.navigateToInfo(item)}>

              <View style={familinkStyles.itemContactContainer}>
                <Gravatar gravatarUrl={item.gravatar} email={item.email} size={68} />
                <View style={familinkStyles.item}>
                  <View style={familinkStyles.textItemContactContainer}>
                    <Text style={familinkStyles.textContact}>{item.firstName} {item.lastName}</Text>
                  </View>
                  <View style={[familinkStyles.textItemContactContainer]}>
                    {item.isFamilinkUser &&
                    <View style={[familinkStyles.containerTag, familinkStyles.centerElement,
                      familinkStyles.textFamilink]}
                    >
                      <Text style={familinkStyles.textTag}>{textLabelFamilink}</Text>
                    </View>
                    }
                    {item.isEmergencyUser &&
                    <View style={[familinkStyles.containerTag, familinkStyles.centerElement,
                      familinkStyles.textUrgency]}
                    >
                      <Text style={familinkStyles.textTag}>{textLabelUrgency}</Text>
                    </View>
                    }
                  </View>
                </View>
                <TouchableHighlight onPress={() =>
                  showInformativePopin(labelPopInCall, item.phone)}
                >
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
        <Header
          navigation={navigation}
          title={headerContact}
        />

        <View style={familinkStyles.contentList}>
          <View style={familinkStyles.contentButtonAddContact}>
            <SearchBar
              arrayContacts={this.state.contacts}
              ref={(searchBarComponent) =>
              {
                this.searchBarComponent = searchBarComponent;
              }
              }
              onChange={myFilterFn => this.setState({ filterList: myFilterFn })}
            />
            <TouchableHighlight
              style={familinkStyles.buttonAddContact}
              onPress={() =>
              {
                navigation.navigate(CONTACT_SCENE_NAME, { contact: {} });
              }
              }
            >
              <Text style={familinkStyles.buttonAddContactText}> + </Text>
            </TouchableHighlight>
          </View>
          {listContacts}
        </View>
        <View style={familinkStyles.bottomBar} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
