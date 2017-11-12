import React, {Component} from 'react';
import './ChoiceButton.css';
import classNames from 'classnames';

const ChoiceButton = (props) => {
  const {fullWidth = false} = props;
  return (
    <button {...props} className={classNames([
      'ChoiceButton',
      {
        'ChoiceButton--fullWidth': fullWidth,
      }
    ])}>
      {props.children}
    </button>
  );
}

export default ChoiceButton;
