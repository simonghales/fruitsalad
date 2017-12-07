import React, {Component} from 'react';
import './FruitBanana.css';
import classNames from 'classnames';
import bananaImage from '../../assets/images/fruits/banana/banana_full.png'
import Fruit from '../Fruit/Fruit';

const FruitBanana = () => {
  return (
    <Fruit>
      <img src={bananaImage} alt='Banana fruit character' width='300'/>
    </Fruit>
  );
}

export default FruitBanana;
