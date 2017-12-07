import React from 'react';
import './Heading.css';
import classNames from 'classnames';

const Heading = ({children, size = 'medium'}) => {
  return (
    <div className={classNames([
      'Heading',
      `Heading--size-${size}`
    ])}>
      {children}
    </div>
  )
};

export default Heading;