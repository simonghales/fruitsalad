import React from 'react';
import './Button.css';
import classNames from 'classnames';

const Button = ({children, type = 'firm', disabled = false, mobileFullWidth = false, ...props}) => {
  return (
    <button className={classNames([
      'Button',
      `Button--type-${type}`,
      {
        'Button--disabled': disabled,
        'Button--mobileFullWidth': mobileFullWidth,
      }
    ])} {...props}>
      {children}
    </button>
  )
};

export default Button;