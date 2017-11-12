import React, {Component} from 'react';
import './UserImage.css';
import classNames from 'classnames';

const UserImage = (props) => {
  const {size = 'default'} = props;
  return (
    <div className={classNames([
      'UserImage',
      `UserImage--size-${size}`
    ])}></div>
  );
}

export default UserImage;
