import React, { Component } from 'react';
import { Picker } from 'react-native';
import { getProfil } from '../WS/WebServiceUser';

const profils = [];
export let profil = 'SENIOR'


export default class ProfilePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { profil: 'SENIOR' };
    profil = 'SENIOR';
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
    });
  }

  changeProfil(profilValue)
  {
    profil = profilValue;
    this.setState({ profil: profilValue });
  }

  render()
  {
    const items = [];
    for (let i = 0; i < profils.length; i += 1)
    {
      items.push(<Picker.Item label={profils[i]} value={profils[i]} />);
    }
    return (
      <Picker
        selectedValue={this.state.profil}
        onValueChange={itemValue => this.changeProfil(itemValue)}
      >
        {items}
      </Picker>
    );
  }
}
