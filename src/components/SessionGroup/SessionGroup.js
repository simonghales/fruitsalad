import React, {Component} from 'react';
import './SessionGroup.css';
import {connect} from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard';
import {SessionState, setGameInPlay} from '../../redux/reducers/session/reducer';
import {Player} from '../../models/player';

import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {AppState} from '../../redux/index';

class SessionGroup extends Component {

  props: {
    sessionUsers: {},
    setGameInPlay(): void,
  };

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    const {setGameInPlay} = this.props;
    setGameInPlay();
  }

  render() {
    const {sessionUsers} = this.props;
    console.log('sessionUsers', sessionUsers);
    return (
      <div className='SessionGroup'>
        <div className='SessionGroup__playersList'>
          {
            sessionUsers && Object.keys(sessionUsers).map((key, id) => (
              <PlayerCard player={sessionUsers[key]} key={key}/>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameInPlay: () => dispatch(setGameInPlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionGroup);