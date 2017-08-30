import React, { PropTypes } from 'react';
import { Image } from 'react-native';

import ContactService from '../service/contactService';

export default class Gravatar extends React.Component
{
  getStyle()
  {
    return { width: this.props.size, height: this.props.size };
  }

  getUrl()
  {
    // Le composant reperend l'url Gravatar si on lui fournit et qu'il n'y pas d'email fourni
    if (this.props.gravatarUrl !== null && this.props.gravatarUrl !== '' && this.props.email === '')
    {
      return this.props.gravatarUrl;
    }
    return ContactService.generateGravatarUrl(this.props.email);
  }

  render()
  {
    const urlSize = (this.props.size >= 80 && this.props.size <= 512) ? this.props.size : 80;
    const url = `${this.getUrl()}?size=${urlSize}`;
    const style = this.getStyle();

    return (
      <Image style={style} source={{ uri: url }} />
    );
  }
}

Gravatar.defaultProps = {
  email: '',
  gravatarUrl: '',
};

Gravatar.propTypes = {
  email: PropTypes.string,
  gravatarUrl: PropTypes.string,
  size: PropTypes.number.isRequired,
};

