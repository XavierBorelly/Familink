import React, { PropTypes } from 'react';
import { Image } from 'react-native';
import Utils from '../Util';

const GRAVATAR_BASE_URI = 'https://www.gravatar.com/avatar/';

export default function Gravatar(props)
{
  const propsSize = props.size;
  const urlSize = (propsSize >= 80 && propsSize <= 512) ? propsSize : 80;
  const url = `${GRAVATAR_BASE_URI + Utils.MD5(props.email)}?size=${urlSize}`;
  return (
    <Image style={{ width: propsSize, height: propsSize }} source={{ uri: url }} />
  );
}

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

Gravatar.defaultProps = {
  email: '',
};
