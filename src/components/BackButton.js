import React, { Component, PropTypes } from 'react';
import { Platform, AppRegistry, Image, TouchableHighlight, StyleSheet, Dimensions, View, Text } from 'react-native';

import BackIcon from '../../assets/back-button.png';

const styles = StyleSheet.create({
  backContainer:
  {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 36,
    backgroundColor: "#80B8FF",
    borderTopWidth: 1.2,
    borderColor: "#5088CF",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:
  {
    width: Dimensions.get('window').width,
    textAlign: 'center',
    fontSize:26,
  }
});

export default class BackButton extends Component
{
  getButton()
  {
    const navigation = this.props.navigation;
    return (
      <TouchableHighlight
        style={styles.backContainer}
        onPress={() =>
        {
          navigation.navigate(this.props.param);
        }}
      >
        <Text style={styles.text}>◄</Text>
      </TouchableHighlight>
    );
  }

  render()
  {
    const button = (Platform.OS === 'ios') ? this.getButton() : (<View style={styles.backContainer} />);
    return button;
  }
}

BackButton.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
  param: PropTypes.string.isRequired,
};

AppRegistry.registerComponent('BackButton', () => BackButton);
