import React, {Component} from 'react';
import './DrawDuoDisplayCenteredMessage.css';
import classNames from 'classnames';

const DrawDuoDisplayCenteredMessage = ({children}) => {
  return (
    <div className='DrawDuoDisplayCenteredMessage'>
      <div className='DrawDuoDisplayCenteredMessage__content'>
        {children}
      </div>
    </div>
  );
}

export default DrawDuoDisplayCenteredMessage;
