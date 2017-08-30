import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import familinkStyles from '../Style';

export default class Header extends Component
{
  getMenuButton()
  {
    const props = this.props;
    return (
      <TouchableHighlight
        style={familinkStyles.headerBurgerMenu}
        onPress={() =>
        {
          props.navigation.navigate('DrawerOpen');
        }}
      >
        <Text style={familinkStyles.headerText}>☰</Text>
      </TouchableHighlight>
    );
  }

  render()
  {
    const props = this.props;
    // Rajout d'une propriété pour afficher ou non le BurgerMenu
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
