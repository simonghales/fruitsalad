import React, {Component} from 'react';
import './MainButton.css';
import classNames from 'classnames';

const MainButton = ({children, fullWidth = false, setHeight = false}) => {
  return (
    <div className={classNames([
      'MainButton',
      {
        'MainButton--fullWidth': fullWidth,
        'MainButton--setHeight': setHeight,
      }
    ])}>
      {children}
    </div>
  );
}

export default MainButton;
