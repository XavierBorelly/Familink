import React, { Component, PropTypes } from 'react';
import { AppRegistry, Image, TouchableHighlight, StyleSheet } from 'react-native';

import BackIcon from '../../assets/back-button.png';
// import { HOME_SCENE_NAME } from '../screens/HomeScreen';

const styles = StyleSheet.create({
  backContainer:
  {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  back:
  {
    width: 0,
    height: 0,
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
});

export default class BackButton extends Component
{
  render()
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
        <Image
          style={styles.back}
          source={BackIcon}
        />
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  navigation: PropTypes.func.isRequired,
  /* eslint-disable */
  param: PropTypes.any.isRequired,
  /* eslint-enable */
};

AppRegistry.registerComponent('BackButton', () => BackButton);
