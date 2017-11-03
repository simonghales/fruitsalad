import React, {Component} from 'react';
import './PlainInput.css';
import classNames from 'classnames';

const PlainInput = ({align = 'left', children, reducedPadding = false}) => {
  return (
    <div className={classNames([
      'PlainInput',
      `PlainInput--align-${align}`,
      {
        'PlainInput--reducedPadding': reducedPadding,
      }
    ])}>
      {children}
    </div>
  );
}

export default PlainInput;
