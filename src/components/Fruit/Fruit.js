import React, {Component} from 'react';
import './Fruit.css';
import classNames from 'classnames';

const Fruit = ({children, size = 'default'}) => {
  return (
    <div className={classNames([
      'Fruit',
      `Fruit--size-${size}`
    ])}>
      <div className='Fruit__fruit'>
        {children}
      </div>
      <div className='Fruit__message'>
        Happy Birthday!
      </div>
    </div>
  );
};

export default Fruit;
