import React, {Component} from 'react';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSession} from '../../redux/reducers/session/reducer';

class SessionScreenJoin extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    invalidSession: boolean,
    setInvalidSession(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(previousProps) {
    const {setInvalidSession} = this.props;
    if (!previousProps.invalidSession && this.props.invalidSession) {
      setInvalidSession();
    }
  }

  render() {

    const {gameInPlay, joined, match, session, invalidSession} = this.props;

    console.log('session', session);
    console.log(`session isloaded?: ${isLoaded(session)} - isEmpty?: ${isEmpty(session)}`);

    if (invalidSession) {

    }

    if (joined && gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    if (joined) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}/hub`,
        }}/>
      );
    }

    return (
      <div className='SessionScreenJoin'>
        <SessionJoin/>
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
    invalidSession: isLoaded(sessions) && isEmpty(sessions),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSession: () => dispatch(setInvalidSession(true)),
  };
};

const wrappedSessionScreenJoin = firebaseConnect((props) => {
  console.log('firebaseConnect props', props);
  return [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
    },
  ];
})(SessionScreenJoin);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedSessionScreenJoin));
