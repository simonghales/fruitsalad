import React from 'react';
import './JumpingLetters.css';
import classNames from 'classnames';

function getLetters(label: string): string[] {
  let letters = [];
  for (let i = 0, len = label.length; i < len; i++) {
    letters.push(label[i]);
  }
  return letters;
}

const JumpingLetters = ({label = '', speed = 'normal', intensity = 'normal'}) => {
  return (
    <div className={classNames([
      'JumpingLetters',
      `JumpingLetters--intensity-${intensity}`,
      `JumpingLetters--speed-${speed}`,
    ])}>
      {
        getLetters(label).map((letter: string, index) => (
          <span key={index} className={classNames([
            {
              'emptySpace': (letter === ' '),
            }
          ])}>{letter}</span>
        ))
      }
    </div>
  )
};

export default JumpingLetters;