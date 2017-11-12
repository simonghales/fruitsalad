import React, {Component} from 'react';
import './ArtyButton.css';
import classNames from 'classnames';

const ArtyButton = (props) => {
  return (
    <button {...props} className='ArtyButton'>
      {props.children}
    </button>
  );
}

export default ArtyButton;
