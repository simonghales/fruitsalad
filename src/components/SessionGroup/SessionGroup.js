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
          <div className='SessionGroup__controls__playersCount'>
            <MainButton fullWidth={true}>
              <button>5 players</button>
            </MainButton>
          </div>
          <div className='SessionGroup__controls__startWrapper'>
            <MainButton fullWidth={true}>
              <button>Start</button>
            </MainButton>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionGroup;
