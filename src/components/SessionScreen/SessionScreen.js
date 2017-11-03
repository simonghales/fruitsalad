import React, {Component} from 'react';
import './SessionScreen.css';
import UserHeader from '../UserHeader/UserHeader';
import SessionJoin from '../SessionJoin/SessionJoin';
import SessionGroup from '../SessionGroup/SessionGroup';

class SessionScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='SessionScreen'>
        <UserHeader/>
        {/*<SessionJoin/>*/}
        <SessionGroup/>
      </div>
    );
  }
}

export default SessionScreen;
