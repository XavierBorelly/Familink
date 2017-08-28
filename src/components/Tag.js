import React, { Component, PropTypes } from 'react';
import { Platform, AppRegistry, TouchableHighlight, View, Text } from 'react-native';
import { familinkStyles } from '../Style';

export default class Tag extends Component
{
  getButton()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableHighlight
        style={familinkStyles.backButtonContainer}
        onPress={() =>
        {
          navigation.navigate(this.props.param);
        }}
      >
        <Text style={familinkStyles.backButtonText}>◄</Text>
      </TouchableHighlight>
    );
  }

  render()
  {
    return (
      <View style={familinkStyles.pickerRow}>
        {items}
      </View>
    );
  }
}

Tag.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
  param: PropTypes.string.isRequired,
};

AppRegistry.registerComponent('Tag', () => Tag);
