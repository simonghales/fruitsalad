import React, {Component} from 'react';
import './SessionScreenHub.css';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import SessionGroup from '../../components/SessionGroup/SessionGroup';
import GameSelector from '../../components/GameSelector/GameSelector';
import {AppState} from '../../redux/index';
import {Redirect, withRouter} from 'react-router';

class SessionScreenHub extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {gameInPlay, joined, match, session} = this.props;

    console.log('session?', session);

    if (!joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/join`,
        }}/>
      );
    }

    if (gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenHub'>
        <div className='SessionScreenHub__gameSelector'>
          <GameSelector/>
        </div>
        <div className='SessionScreenHub__group'>
          <SessionGroup session={session}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    session: (sessions) ? sessions[Object.keys(sessions)[0]] : null,
    sessions: sessions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedSessionScreenHub = firebaseConnect((props) => {
  console.log('load the session...');
  return [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
    },
  ];
})(SessionScreenHub);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedSessionScreenHub));