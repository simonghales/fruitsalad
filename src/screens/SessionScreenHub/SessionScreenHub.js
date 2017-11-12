import React, {Component} from 'react';
import './SessionScreenHub.css';
import SessionGroup from '../../components/SessionGroup/SessionGroup';
import GameSelector from '../../components/GameSelector/GameSelector';

class SessionScreenHub extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='SessionScreenHub'>
        <div className='SessionScreenHub__gameSelector'>
          <GameSelector/>
        </div>
        <div className='SessionScreenHub__group'>
          <SessionGroup/>
        </div>
      </div>
    );
  }
}

export default SessionScreenHub;