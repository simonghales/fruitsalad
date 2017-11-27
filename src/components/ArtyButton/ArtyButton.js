import React, {Component} from 'react';
import './ArtyButton.css';
import classNames from 'classnames';

const ArtyButton = ({children, ...props}) => {
  return (
    <button {...props} className='ArtyButton'>
      {children}
    </button>
  );
}

export default ArtyButton;
