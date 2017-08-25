import React, { Component, PropTypes } from 'react';
import { Text, Image, View, TouchableHighlight } from 'react-native';
import { familinkStyles } from '../Style';
import MenuIcon from '../../assets/icon_menu.jpg';

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
        <Image style={familinkStyles.headerIcon} source={MenuIcon} />
      </TouchableHighlight>
    );
  }

  render()
  {
    const props = this.props;
    const menuButton = (props.hasMenu) ? this.getMenuButton() : null;

    return (
      <View style={familinkStyles.headerContainer} >
        {menuButton}
        <Text style={familinkStyles.headerTitle}>{props.title}</Text>
      </View>
    );
  }
}

Header.propType = {
  navigation: PropTypes.any,
  title: PropTypes.any,
};
