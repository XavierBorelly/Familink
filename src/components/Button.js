import React, { Component, PropTypes } from 'react';
import { Text, AppRegistry, Image, TouchableHighlight, StyleSheet, Dimensions, View } from 'react-native';

import BackIcon from '../../assets/back-button.png';

const styles = StyleSheet.create({
  button:{

    borderRadius: 8,
    backgroundColor: '#FF5722',
    flex: 1,
    color: 'white',
    borderColor:'#BF360C',
    borderWidth: 1,

      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'

  },
  text:{
      fontSize: 28,
      color: 'white',
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
        <Image
          style={styles.back}
          source={BackIcon}
        />
      </TouchableHighlight>
    );
  }

  render()
  {
    return (
      <TouchableHighlight style={styles.button}>
        <Text style{styles.}>HELLOOOO</Text>
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  navigation: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
  param: PropTypes.string.isRequired,
};

AppRegistry.registerComponent('BackButton', () => BackButton);
