import React, { Component, PropTypes } from 'react';
import { Dimensions, Platform, Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native';

import MenuIcon from '../../assets/icon_menu.jpg';

const $bgHeaderColor = '#0E9A01';

const styles = StyleSheet.create({
  header_container: {
    position: 'absolute',
    flexDirection: 'row',
    top: (Platform.OS === 'ios') ? 20 : 0,
    height: 38,
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: $bgHeaderColor,
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    position: 'absolute',
    left: 38,
    borderLeftWidth: 1,
    paddingLeft: 10,
    fontSize: 26,
  },
});


export default class Header extends Component
{
  getMenuButton()
  {
    const props = this.props;
    return (
      <TouchableHighlight onPress={() =>
      {
        props.navigation.navigate('DrawerOpen');
      }}
      >
        <Image style={styles.icon} source={MenuIcon} />
      </TouchableHighlight>
    );
  }

  render()
  {
    const props = this.props;
    const menuButton = (props.hasMenu) ? this.getMenuButton() : null;

    return (
      <View style={styles.header_container} >
        {menuButton}
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  }
}

Header.propType = {
  navigation: PropTypes.any,
  title: PropTypes.any,
};
