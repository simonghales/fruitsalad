import React, {Component} from 'react';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';

class SessionScreenJoin extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='SessionScreenJoin'>
        <SessionJoin/>
      </div>
    );
  }
}

export default SessionScreenJoin;

