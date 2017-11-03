import React, {Component} from 'react';
import './MainButton.css';
import classNames from 'classnames';

const MainButton = ({children, fullWidth = false}) => {
  return (
    <div className={classNames([
      'MainButton',
      {
        'MainButton--fullWidth': fullWidth,
      }
    ])}>
      {children}
    </div>
  );
}

export default MainButton;
