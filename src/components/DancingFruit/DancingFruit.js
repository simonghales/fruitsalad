import React, {Component} from 'react';
import './DancingFruit.css';
import classNames from 'classnames';
import Fruit from '../Fruit/Fruit';
import FruitBanana from '../FruitBanana/FruitBanana';
import FruitStrawberry from '../FruitStrawberry/FruitStrawberry';

const DancingFruit = () => {
  return (
    <div className='DancingFruit'>
      <div className='DancingFruit__fruit'>
        <FruitBanana/>
      </div>
      <div className='DancingFruit__fruit'>
        <FruitBanana/>
      </div>
      <div className='DancingFruit__fruit'>
        <FruitBanana/>
      </div>
      <div className='DancingFruit__fruit'>
        <FruitBanana/>
      </div>
    </div>
  );
}

export default DancingFruit;
