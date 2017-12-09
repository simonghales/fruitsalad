import React, {Component} from 'react';
import './TestingScreen.css';
import classNames from 'classnames';
import JumpingLetters from '../../components/JumpingLetters/JumpingLetters';
import DancingFruit from '../../components/DancingFruit/DancingFruit';

const TestingScreen = () => {
  return (
    <div className='TestingScreen'>
      <div className='TestingScreen__content'>
        <DancingFruit/>
      </div>
    </div>
  );
}

export default TestingScreen;
