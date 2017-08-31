import React, { Component, PropTypes } from 'react';
import { BackHandler, Text, View, TouchableHighlight } from 'react-native';
import familinkStyles from '../Style';

import { HOME_SCENE_NAME } from '../screens/HomeScreen';

export default class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.renderMenuButton = this.renderMenuButton.bind(this);
  }

  componentWillMount()
  {
    // Handle android back button
    BackHandler.addEventListener('hardwareBackPress', () =>
    {
      // Go back to last page
      if (this.props.goBackTo)
      {
        this.props.navigation.navigate(this.props.goBackTo);
        return true;
      }
      // Quit app if we already are on Home page
      else if (this.props.homePage || this.props.loginPage)
      {
        BackHandler.exitApp();
        return false;
      }
      // Go back to Home page by default
      this.props.navigation.navigate(HOME_SCENE_NAME);
      return true;
    });
  }

  navigate()
  {
    // Return arrow => go back to last page
    if (this.props.goBackTo)
    {
      this.props.navigation.navigate(this.props.goBackTo);
    }
    // Burger menu => open menu
    else
    {
      this.props.navigation.navigate('DrawerOpen');
    }
  }

  renderMenuButton()
  {
    // Menu button shown except for login page
    if (!this.props.loginPage)
    {
      return (
        <TouchableHighlight
          style={familinkStyles.headerBurgerMenu}
          onPress={this.navigate}
        >
          <Text style={familinkStyles.headerText}>{this.props.goBackTo ? '<' : '☰'}</Text>
        </TouchableHighlight>
      );
    }
    return null;
  }

  render()
  {
    const menuButton = this.renderMenuButton();

    return (
      <View style={familinkStyles.headerContainer} >
        {/* BURGER MENU OR BACK BUTTON */}
        {menuButton}
        {/* TITLE */}
        <Text style={familinkStyles.headerTitle}>{this.props.title}</Text>
      </View>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  goBackTo: PropTypes.string.isRequired,
  homePage: PropTypes.bool,
  loginPage: PropTypes.bool,
};

Header.defaultProps = {
  goBackTo: null,
  homePage: false,
  loginPage: false,
};
