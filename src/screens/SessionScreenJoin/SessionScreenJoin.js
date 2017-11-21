import React, {Component} from 'react';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSessionEnforced} from '../../redux/reducers/session/reducer';

class SessionScreenJoin extends Component {

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    setInvalidSessionEnforced(): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
  }

  render() {

    const {gameInPlay, joined, match} = this.props;

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

const wrappedSessionScreenJoin = firebaseConnect((props) => {
  return [
    {
      path: '/sessions',
      queryParams: ['orderByChild=id', `equalTo=${props.match.params.id}`, 'limitToFirst=1'],
    },
  ];
})(SessionScreenJoin);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedSessionScreenJoin));
