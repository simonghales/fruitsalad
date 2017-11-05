import React, {Component} from 'react';
import './SessionGroup.css';
import UserHeader from '../UserHeader/UserHeader';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import PlayerCard from '../PlayerCard/PlayerCard';

class SessionGroup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='SessionGroup'>
        <div className='SessionGroup__playersList'>
          {Array.from({length: 8}).map((item, index) => (
            <PlayerCard key={index}/>
          ))}
        </div>
        <div className='SessionGroup__controls'>
          <div className='SessionGroup__controls__startWrapper'>
            <MainButton fullWidth={true} setHeight={true}>
              <button className='SessionGroup__controls__start'>
                <div className='MainButton__title'>Start the Game</div>
                <div className='MainButton__subtitle'>5 players</div>
              </button>
            </MainButton>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionGroup;
