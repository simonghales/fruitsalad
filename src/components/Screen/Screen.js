import React from 'react';
import './Screen.css';
import classNames from 'classnames';

const Screen = ({children, type = 'full'}) => {
  return (
    <div className={classNames([
      'Screen',
      `Screen--type-${type}`
    ])}>
      {children}
    </div>
  )
};

export default Screen;