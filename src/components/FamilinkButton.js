import React, { Component, PropTypes } from 'react';
import { Text, AppRegistry, TouchableHighlight, StyleSheet } from 'react-native';


const buttonColor = '#FB8C00';
const buttonBorderColor = '#EF6C00';
const buttonTextColor = 'white';

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: buttonColor,
    flex: 1,
    borderColor: buttonBorderColor,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 28,
    color: buttonTextColor,
    fontWeight: 'bold',
  },
});

export default class FamilinkButton extends Component
{
  render()
  {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
        {
          this.props.test;
        }}
      >
        <Text style={styles.text}>{this.props.param}</Text>
      </TouchableHighlight>
    );
  }
}

FamilinkButton.propTypes = {
  param: PropTypes.string.isRequired,
  test: PropTypes.func.isRequired,
};

AppRegistry.registerComponent('FamilinkButton', () => FamilinkButton);
