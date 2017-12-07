import React, {Component} from 'react';
import './FullScreenLoadingMessage.css';
import classNames from 'classnames';
import JumpingLetters from '../../components/JumpingLetters/JumpingLetters';
import Heading from '../Heading/Heading';

const FullScreenLoadingMessage = ({title, subtitle}) => {
  return (
    <div className='FullScreenLoadingMessage'>
      <div className='FullScreenLoadingMessage__content'>
        <div className='FullScreenLoadingMessage__title'>
          <Heading size='huge'>{title}</Heading>
        </div>
        <Heading size='medium'>
          <JumpingLetters label={subtitle}/>
        </Heading>
      </div>
    </div>
  );
}

export default FullScreenLoadingMessage;
