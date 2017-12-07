import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SessionScreenHub.css';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
import {connect} from 'react-redux';
import SessionGroup from '../../components/SessionGroup/SessionGroup';
import GameSelector from '../../components/GameSelector/GameSelector';
import {AppState} from '../../redux/index';
import {Redirect, withRouter} from 'react-router';
import {setInvalidSessionEnforced} from '../../redux/reducers/session/reducer';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import SessionScreenHubBottom from './SessionScreenHubBottom';
import SessionJoinedChecker from '../session/components/SessionJoinedChecker/SessionJoinedChecker';
import Screen from '../../components/Screen/Screen';

class SessionScreenHub extends Component {

  props: {
    loadedSession: boolean,
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    sessionUsers: {},
    sessionCode: string,
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

    const {match, session, sessionUsers, sessionCode} = this.props;

    if (isLoaded(session) && session.state === 'playing') {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    return (
      <Screen>
        <div className='SessionScreenHub'>
          <SessionJoinedChecker joinedOnly={false}>
            <Redirect to={{
              pathname: `/session/${match.params.id}/join`,
            }}/>
          </SessionJoinedChecker>
          <header>
            <div>fruitsalad.party/{sessionCode}</div>
          </header>
          <div className='SessionScreenHub__group'>
            <SessionGroup sessionUsers={sessionUsers}/>
          </div>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  const sessionUsers = state.firebase.data.sessionUsers;
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    loadedSession: isLoaded(session),
    session: session,
    sessionUsers: sessionUsers,
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHub));