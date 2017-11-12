import React, {Component} from 'react';
import './ChoiceButton.css';
import classNames from 'classnames';

const ChoiceButton = (props) => {
  const {fullWidth = false} = props;
  let buttonSafeProps = {
    ...props
  };
  if (buttonSafeProps['fullWidth']) {
    delete buttonSafeProps['fullWidth'];
  }
  return (
    <button {...buttonSafeProps} className={classNames([
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
