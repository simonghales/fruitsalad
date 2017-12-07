import React, {Component} from 'react';
import './FruitStrawberry.css';
import classNames from 'classnames';
import strawberryImage from '../../assets/images/fruits/strawberry/strawberry_art.png';
import Fruit from '../Fruit/Fruit';

const FruitStrawberry = () => {
  return (
    <Fruit>
      <img src={strawberryImage} alt='Banana fruit character' width='300'/>
    </Fruit>
  );
}

export default FruitStrawberry;
