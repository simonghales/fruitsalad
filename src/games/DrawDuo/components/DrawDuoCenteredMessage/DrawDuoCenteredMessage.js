import React, {Component} from 'react';
import './DrawDuoCenteredMessage.css';
import classNames from 'classnames';

const DrawDuoCenteredMessage = ({children}) => {
  return (
    <div className='DrawDuoCenteredMessage'>
      <div className='DrawDuoCenteredMessage__content'>
        {children}
      </div>
    </div>
  );
}

export default DrawDuoCenteredMessage;
