import React, { PropTypes } from 'react';
import { Image } from 'react-native';

import ContactService from '../service/ContactService';
import { checkMail } from '../errors/FamilinkErrors';
import defaultGravatar from '../../assets/icon_defaultGravatar.jpg';

export default class Gravatar extends React.Component
{
  getImageSource()
  {
    const canUseEmail = checkMail(this.props.email) === '';
    const canUseGravatar = this.props.gravatarUrl != null && this.props.gravatarUrl !== '';

    if (canUseEmail)
    {
      return this.getImageUrl(ContactService.generateGravatarUrl(this.props.email));
    }
    else if (canUseGravatar)
    {
      return this.getImageUrl(this.props.gravatarUrl);
    }

    return defaultGravatar;
  }

  getImageUrl(baseUrl)
  {
    const urlSize = (this.props.size >= 80 && this.props.size <= 512) ? this.props.size : 80;
    return { uri: `${baseUrl}?size=${urlSize}` };
  }

  getStyle()
  {
    return {
      width: this.props.size, height: this.props.size,
    };
  }

  render()
  {
    const usedSource = this.getImageSource();
    const style = this.getStyle();

    return (
      <Image style={style} source={usedSource} />
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
