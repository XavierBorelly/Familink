import React, { Component } from 'react';
import { TabBarIOS, View } from 'react-native';
import { getProfil } from '../WS/WebServiceUser';

const profils = [];
export const profil = 'SENIOR';

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

  render()
  {
    const items = [];
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
              // profil = profils[i];
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
}
