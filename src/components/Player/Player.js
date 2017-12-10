import React, {Component} from 'react';
import './Player.css';
import classNames from 'classnames';
import {SessionUserModel, UserModel} from '../../games/DrawDuo/logic/models';
import FruitBanana from '../FruitBanana/FruitBanana';

class Player extends Component {

  props: {
    action?: string,
    disabled?: boolean,
    player: SessionUserModel | UserModel,
    pointsSize?: string,
    showAction?: boolean,
    showName?: boolean,
    showPoints?: boolean,
    size?: string,
  };

  render() {
    const {
      action = '',
      disabled,
      player,
      pointsSize = 'default',
      showAction = false,
      showName = true,
      showPoints = false,
      size = 'default',
    } = this.props;

    return (
      <div className={classNames([
        'Player',
        `Player--pointsSize-${pointsSize}`,
        {
          'Player--disabled': disabled,
        }
      ])}>
        <FruitBanana action={action} name={player.name} image={player.image} showAction={showAction}
                     showName={showName} showPoints={showPoints} size={size}/>
      </div>
    );
  }

}

export default Player;
