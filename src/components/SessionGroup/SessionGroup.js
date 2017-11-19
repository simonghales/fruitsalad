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
    firebase: any,
    players: Player[],
    sessions: {},
    setGameInPlay(): void,
  };

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
  }

  startGame() {
    const {setGameInPlay} = this.props;
    setGameInPlay();
  }

  updateSession() {
    const {firebase, sessions} = this.props;
    const sessionKey = Object.keys(sessions)[0];
    console.log(`update: ${sessionKey}`);
    firebase.update(`/sessions/${sessionKey}`, {
      id: 'SILLYKITTENS',
      host: '',
      users: {},
    });
  }

  updateUsers() {
    const {firebase, sessions} = this.props;
    const sessionKey = Object.keys(sessions)[0];
    console.log(`update: ${sessionKey}`);
    firebase.push(`/sessions/${sessionKey}/users`, {
      id: 'something',
      image: 'something',
      name: 'Mila',
    });
    firebase.push(`/sessions/${sessionKey}/users`, {
      id: 'something',
      image: 'something',
      name: 'Jeremy',
    });
  }

  render() {
    const {players} = this.props;
    const {users, session} = this.props;
    console.log('props', this.props);
    return (
      <div className='SessionGroup'>
        {/*<div onClick={this.updateSession}>*/}
        {/*UPDATE SESSION???*/}
        {/*</div>*/}
        {/*<div onClick={this.updateUsers}>*/}
        {/*UPDATE USERS???*/}
        {/*</div>*/}
        <div className='SessionGroup__playersList'>
          {
            session && Object.keys(session.users).map((key, id) => (
              <PlayerCard player={session.users[key]} key={key}/>
            ))
          }
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
    sessions: state.firebase.data.sessions,
    session: (state.firebase.data.sessions) ? state.firebase.data.sessions[Object.keys(state.firebase.data.sessions)[0]] : null,
    firebase: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameInPlay: () => dispatch(setGameInPlay()),
  };
};

const wrappedSessionGroup = firebaseConnect((props) => {
  return [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', 'equalTo=SILLYKITTENS', 'limitToFirst=1'],
    },
  ];
})(SessionGroup);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedSessionGroup);