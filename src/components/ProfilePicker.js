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
    this.state = { profil: props.selected, isLoaded: false };
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
    }, () => 0);
  }

  render()
  {
    let selectedValue = this.props.selected;

    let errorNoSelect = this.props.error;

    if (this.state.profil !== null)
    {
      selectedValue = this.state.profil;
      errorNoSelect = '';
    }

    const items = [];


    // Montre les profils séléctionnables
    for (let i = 0; i < profils.length; i += 1)
    {
      items.push(
        <TouchableHighlight
          style={[(selectedValue === profils[i] ?
            familinkStyles.pickerItemFocused : familinkStyles.pickerItem),
            (errorNoSelect === '' ? '' : familinkStyles.pickerItemError),
            (i === 0 ? styles.leftRounded : ''),
            (i === profils.length - 1 ? styles.rightRounded : '')]}
          onPress={() =>
          {
            this.setState({ profil: profils[i] });
          }}
        >
          <Text style={styles.text}>{profils[i]}</Text>
        </TouchableHighlight>,
      );
    }

    // Vue qui montre le profil séléctionné lorsque le picker n'est pas editable
    if (!this.props.editable)
    {
      return (
        <View style={familinkStyles.pickerRow}>
          <TouchableHighlight
            style={[familinkStyles.pickerItem, styles.leftRounded, styles.rightRounded]}
          >
            <Text style={familinkStyles.text}>{this.props.selected}</Text>
          </TouchableHighlight>
        </View>
      );
    }

    // Vue qui montre le chargement des profils
    if (items.length === 0)
    {
      return (
        <View style={familinkStyles.pickerRow}>
          <TouchableHighlight
            style={[familinkStyles.pickerItem, styles.leftRounded, styles.rightRounded]}
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
  selected: PropTypes.objectOf(PropTypes.string),
  editable: PropTypes.objectOf(PropTypes.boolean),
  error: PropTypes.objectOf(PropTypes.string),
};

ProfilePicker.defaultProps = {
  selected: null,
  editable: true,
  error: '',
};

AppRegistry.registerComponent('ProfilePicker', () => ProfilePicker);
