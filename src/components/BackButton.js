import React, { Component, PropTypes } from 'react';
import { Platform, AppRegistry, TouchableHighlight, View, Text } from 'react-native';
import familinkStyles from '../Style';

export default class BackButton extends Component
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
    const button = (Platform.OS === 'ios') ? this.getButton() : (<View style={familinkStyles.backButtonContainer} />);
    return button;
  }
}

BackButton.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
  param: PropTypes.string.isRequired,
};

AppRegistry.registerComponent('BackButton', () => BackButton);
