import React, { Component } from 'react';
import { Picker, Platform, TabBarIOS, View } from 'react-native';
import { getProfil } from '../WS/WebServiceUser';

const profils = [];

export default class ProfilePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { profil: 'SENIOR' };
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

  getPicker()
  {
    const items = [];
    if (Platform.OS === 'android')
    {
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
    if (Platform.OS === 'ios')
    {
      if (items.length === 0)
      {
        for (let i = 0; i < profils.length; i += 1)
        {
          items.push(
            <TabBarIOS.Item
              title={profils[i]}
              selected={this.state.profil === profils[i]}
              onPress={() =>
              {
                this.setState({
                  profil: profils[i],
                });
              }}
            >
              <View />
            </TabBarIOS.Item>);
        }
      }
      return (
        <TabBarIOS
          profil={this.state.profil}
        >
          {items}
        </TabBarIOS>
      );
    }
    return (<View />);
  }

  changeProfil(profilValue)
  {
    this.setState({ profil: profilValue });
  }

  render()
  {
    return this.getPicker();
  }
}
