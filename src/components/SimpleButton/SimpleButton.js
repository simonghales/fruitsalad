import React, {Component} from 'react';
import './SimpleButton.css';
import classNames from 'classnames';

const SimpleButton = ({children, onClick, disabled}) => {
  return (
    <div className={classNames([
      'SimpleButton',
      {
        'SimpleButton--disabled': disabled,
      }
    ])} onClick={onClick}>
      {children}
    </div>
  );
}

export default SimpleButton;
