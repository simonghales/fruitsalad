import React, {Component} from 'react';
import './GameSelector.css';
import classNames from 'classnames';

class GameSelector extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='GameSelector'>
        <div className='GameSelector__content'>
          <div className='GameSelector__game'>
            <div className='GameSelector__game__thumb'></div>
            <div className='GameSelector__game__info'>
              <div className='GameSelector__game__name'>Draw Duo</div>
              <div className='GameSelector__game__recommendedPlayers'>4-12 players</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameSelector;
