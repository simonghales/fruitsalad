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
    players: Player[],
    users: {},
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
    const {players} = this.props;
    const {users} = this.props;
    console.log('props', this.props);
    return (
      <div className='SessionGroup'>
        <div className='SessionGroup__playersList'>
          {
            users && Object.keys(users).map((key, id) => (
              <PlayerCard player={users[key]} key={key}/>
            ))
          }
          {players.map((player, index) => (
            <PlayerCard player={player} key={index}/>
          ))}
        </div>
        {/*<div className='SessionGroup__controls'>*/}
        {/*<div className='SessionGroup__controls__startWrapper'>*/}
        {/*<MainButton fullWidth={true} setHeight={true}>*/}
        {/*<button className='SessionGroup__controls__start' onClick={this.startGame}>*/}
        {/*<div className='MainButton__title'>Start the Game</div>*/}
        {/*<div className='MainButton__subtitle'>5 players</div>*/}
        {/*</button>*/}
        {/*</MainButton>*/}
        {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    players: state.session.players,
    users: state.firebase.data.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameInPlay: () => dispatch(setGameInPlay()),
  };
};

const wrappedSessionGroup = firebaseConnect([
  'users'
])(SessionGroup);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedSessionGroup);