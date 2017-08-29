import React, { Component, PropTypes } from 'react';
import { Text, AppRegistry, TouchableHighlight, StyleSheet, View } from 'react-native';
import { getProfil } from '../WS/WebServiceUser';
import familinkStyles from '../Style';

const profils = [];

const styles = StyleSheet.create({
  leftRounded: {
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },

  rightRounded: {
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
});

export default class ProfilePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { profil: props.selected || 'SENIOR', isLoaded: false };
  }

  componentDidMount()
  {
    if (profils.length !== 0)
    {
      return;
    }
    getProfil().then((p) =>
    {
      for (let i = 0; i < p.length; i += 1)
      {
        profils.push(p[i]);
      }
      this.setState({ isLoaded: true });
    });
  }

  render()
  {
    const items = [];
    for (let i = 0; i < profils.length; i += 1)
    {
      if (i === 0)
      {
        items.push(
          <TouchableHighlight
            style={[(this.state.profil === profils[i] ?
              familinkStyles.pickerItemFocused : familinkStyles.pickerItem), styles.leftRounded]}
            onPress={() =>
            {
              this.setState({ profil: profils[i] });
            }}
          >
            <Text style={styles.text}>{profils[i]}</Text>
          </TouchableHighlight>,
        );
      }
      else if (i === profils.length - 1)
      {
        items.push(
          <TouchableHighlight
            style={[(this.state.profil === profils[i] ?
              familinkStyles.pickerItemFocused : familinkStyles.pickerItem), styles.rightRounded]}
            onPress={() =>
            {
              this.setState({ profil: profils[i] });
            }}
          >
            <Text style={styles.text}>{profils[i]}</Text>
          </TouchableHighlight>,
        );
      }
      else
      {
        items.push(
          <TouchableHighlight
            style={this.state.profil === profils[i] ?
              familinkStyles.pickerItemFocused : familinkStyles.pickerItem}
            onPress={() =>
            {
              this.setState({ profil: profils[i] });
            }}
          >
            <Text style={styles.text}>{profils[i]}</Text>
          </TouchableHighlight>,
        );
      }
    }
    if (items.length === 0)
    {
      return (
        <View style={familinkStyles.pickerRow}>
          <TouchableHighlight
            style={familinkStyles.pickerItem}
          >
            <Text style={familinkStyles.text}>Chargement des profils ...</Text>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={familinkStyles.pickerRow}>
        {items}
      </View>
    );
  }
}

ProfilePicker.propTypes = {
  selected: PropTypes.objectOf(PropTypes.any),
};

ProfilePicker.defaultProps = {
  selected: 'SENIOR',
};

AppRegistry.registerComponent('ProfilePicker', () => ProfilePicker);
