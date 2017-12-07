import React, {Component} from 'react';
import './Fruit.css';
import classNames from 'classnames';
import FruitBanana from '../FruitBanana/FruitBanana';

const Fruit = ({children}) => {
  return (
    <div className='Fruit'>
      {children}
    </div>
  );
}

export default Fruit;
