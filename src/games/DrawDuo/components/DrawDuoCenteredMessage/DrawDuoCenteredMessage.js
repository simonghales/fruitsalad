import React, {Component} from 'react';
import './DrawDuoCenteredMessage.css';
import classNames from 'classnames';
import Heading from '../../../../components/Heading/Heading';

const DrawDuoCenteredMessage = ({children}) => {
  return (
    <div className='DrawDuoCenteredMessage'>
      <div className='DrawDuoCenteredMessage__content'>
        <Heading>{children}</Heading>
      </div>
    </div>
  );
}

export default DrawDuoCenteredMessage;
