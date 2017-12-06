import React, {Component} from 'react';
import './AppLoadingScreen.css';
import classNames from 'classnames';
import JumpingLetters from '../../components/JumpingLetters/JumpingLetters';

const AppLoadingScreen = () => {
  return (
    <div className='AppLoadingScreen'>
      <div className='AppLoadingScreen__content'>
        <h2 className='AppLoadingScreen__title'>
          fruit salad
        </h2>
        <h3 className='AppLoadingScreen__subtitle'>
          <JumpingLetters label='nomming...'/>
        </h3>
      </div>
    </div>
  );
}

export default AppLoadingScreen;
