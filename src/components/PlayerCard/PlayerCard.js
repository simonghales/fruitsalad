import React, {Component} from 'react';
import './PlayerCard.css';
import classNames from 'classnames';
import {Player} from '../../models/player';

const PlayerCard = ({player}: { player: Player }) => {
  return (
    <div className={classNames([
      'PlayerCard',
    ])}>
      <div className='PlayerCard__image'>
      </div>
      <div className='PlayerCard__name'>{player.name}</div>
    </div>
  );
}

export default PlayerCard;
