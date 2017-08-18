import React, { Component, PropTypes } from 'react';
import { Dimensions, Platform, Text, Image, View, StyleSheet, TouchableHighlight } from 'react-native';

import MenuIcon from '../../assets/icon_menu.jpg';

const styles = StyleSheet.create({
  header_container: {
    position: 'absolute',
    flexDirection: 'row',
    top: (Platform.OS === 'ios') ? 20 : 10,
    height: 36,
    width: Dimensions.get('window').width,
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
  },
});


export default class Header extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const props = this.props;
    return (
      <View style={styles.header_container} >
        <TouchableHighlight onPress={() =>
        {
          props.navigation.navigate('DrawerOpen');
        }}
        >
          <Image style={styles.icon} source={MenuIcon} />
        </TouchableHighlight>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  }
}

Header.propType = {
  navigation: PropTypes.any,
  title: PropTypes.any,
};
