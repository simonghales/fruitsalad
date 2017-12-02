import React, {Component} from 'react';
import './DrawDuoAnimatedMessage.css';
import classNames from 'classnames';

const DrawDuoAnimatedMessage = ({label = '', size = 'large'}) => (
  <h3 className={classNames([
    'DrawDuoAnimatedMessage',
    `DrawDuoAnimatedMessage--size-${size}`,
  ])}>{
    label.split(' ').map((word: string, index) => (
      <span key={index}>{word}</span>
    ))
  }</h3>
);

export default DrawDuoAnimatedMessage;