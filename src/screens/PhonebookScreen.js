import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';

import { CONTACT_SCENE_NAME } from '../apps/ContactApp';
import { HOME_SCENE_NAME } from './HomeScreen';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import iconCall from '../../assets/icon_phone.jpg';
import defaultGravatar from '../../assets/icon_defaultGravatar.jpg';

export const PHONEBOOK_SCENE_NAME = 'PHONEBOOK_SCENE';

const $bgColor = '#F5FCFF';

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
});

// eslint-disable-next-line react/prefer-stateless-function
export default class PhonebookScreen extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { };
  }

  componentDidMount()
  {
    console.log(contact);
  }

  navigateToInfo(trailer) {
    this.navigate(INFO_SCENE_NAME, {contact : contact});
  };

  render()
  {
    const navigation = this.props.navigation;
    return (
      <View >
        <View style={styles.container}>
          <Header hasMenu navigation={navigation} title="Répertoire" />
        </View>
        <FlatList
          data={contact}
          renderItem={({ item }) =>
            (<TouchableHighlight onPress={() => this.navigateToInfo(item)}>
            <View style={styles.itemContactContainer}>
              <Image source={item.gravatar === null || item.gravatar === '' ? defaultGravatar : {uri: item.gravatar} } style={{width: 70, height: 70}}  />
              <View style={styles.textItemContactContainer}>
                <View>
                  <Text>{item.firstName} {item.lastName}</Text>
                </View>
                <View>
                  <Text>{item.isFamilinkUser} {item.isEmergencyUser}</Text>
                </View>
              </View>
                <TouchableHighlight onPress={() => alert('call en cours')}>
                  <Image style={{width: 70, height: 70}} source={iconCall} />
                </TouchableHighlight>
            </View>

            </TouchableHighlight>)}
        />

        <BackButton navigation={navigation} param={HOME_SCENE_NAME} />
      </View>
    );
  }
}

PhonebookScreen.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
};
