import React, { Component, PropTypes } from 'react';
import { Container, Header, Item, Input, Icon } from 'native-base';
import { placeholderSearchbar } from '../Util';

export default class SearchBar extends Component
{
  constructor(props)
  {
    super(props);
    this.onCurrentSearchChange = this.onCurrentSearchChange.bind(this);
    this.state = { listContacts: props.arrayContacts };
  }

  // Recherche selon nom prénom ou téléphone
  onCurrentSearchChange(text)
  {
    this.props.onChange((item) =>
    {
      const surname = item.firstName.toLowerCase();

      let name = '';
      if (item.lastName !== null && item.lastName !== undefined)
      {
        name = item.lastName.toLowerCase();
      }
      return ((surname.indexOf(text.toLowerCase()) > -1)
      || (name.indexOf(text.toLowerCase()) > -1)
      || (item.phone.indexOf(text) > -1));
    });
  }

  render()
  {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder={placeholderSearchbar}
              onChangeText={text => this.onCurrentSearchChange(text)}
            />
            <Icon name="ios-people" />
          </Item>
        </Header>
      </Container>
    );
  }
}

SearchBar.propTypes = {
  arrayContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};
