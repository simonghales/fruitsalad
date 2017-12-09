import React, {Component} from 'react';
import './BigScreenDisplayPrompt.css';
import classNames from 'classnames';
import Fruit from '../Fruit/Fruit';
import JumpingLetters from '../JumpingLetters/JumpingLetters';
import FullScreenLoadingMessage from '../FullScreenLoadingMessage/FullScreenLoadingMessage';

const BigScreenDisplayPrompt = () => {
  return (
    <div className='BigScreenDisplayPrompt'>
      <FullScreenLoadingMessage title='TV screen required' subtitle='pls display at 1920 x 1080'/>
    </div>
  );
}

export default BigScreenDisplayPrompt;
