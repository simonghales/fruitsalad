import React, {Component} from 'react';
import './Player.css';
import classNames from 'classnames';
import {SessionUserModel} from '../../games/DrawDuo/logic/models';

const Player = ({player}: { player: SessionUserModel }) => {
  return (
    <div className={classNames([
      'Player',
    ])}>
      <div className='Player__name'>{player.name}</div>
    </div>
  );
}

export default Player;
