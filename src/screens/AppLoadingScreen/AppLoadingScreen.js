import React, {Component} from 'react';
import './AppLoadingScreen.css';
import classNames from 'classnames';

const AppLoadingScreen = () => {
  return (
    <div className='AppLoadingScreen'>
      <div className='AppLoadingScreen__content'>
        <h2 className='AppLoadingScreen__title'>Fruit Salad</h2>
        <h3 className='AppLoadingScreen__subtitle'>Yummy yummy</h3>
        <div className='AppLoadingScreen__loading'>loading...</div>
      </div>
    </div>
  );
}

export default AppLoadingScreen;
