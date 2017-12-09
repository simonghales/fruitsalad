import React, {Component} from 'react';
import './PlayerCompact.css';
import classNames from 'classnames';
import {SessionUserModel} from '../../games/DrawDuo/logic/models';

const PlayerCompact = ({player}: { player: SessionUserModel }) => {
  return (
    <div className={classNames([
      'PlayerCompact',
    ])}>
      <div className='PlayerCompact__name'>{player.name}</div>
    </div>
  );
}

export default PlayerCompact;
