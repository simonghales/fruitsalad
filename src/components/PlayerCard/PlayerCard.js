import React, {Component} from 'react';
import './PlayerCard.css';
import classNames from 'classnames';

const PlayerCard = () => {
  return (
    <div className={classNames([
      'PlayerCard',
    ])}>
      <div className='PlayerCard__image'>
      </div>
      <div>Player Name</div>
    </div>
  );
}

export default PlayerCard;
