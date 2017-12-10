import React, {Component} from 'react';
import './FullScreenLoadingMessage.css';
import classNames from 'classnames';
import JumpingLetters from '../../components/JumpingLetters/JumpingLetters';
import Heading from '../Heading/Heading';

const FullScreenLoadingMessage = ({title, subtitle, subtitleSize = 'medium'}) => {
  return (
    <div className='FullScreenLoadingMessage'>
      <div className='FullScreenLoadingMessage__content'>
        {
          title && (
            <div className='FullScreenLoadingMessage__title'>
              <Heading size='huge'>{title}</Heading>
            </div>
          )
        }
        <Heading size={subtitleSize}>
          <JumpingLetters label={subtitle}/>
        </Heading>
      </div>
    </div>
  );
}

export default FullScreenLoadingMessage;
