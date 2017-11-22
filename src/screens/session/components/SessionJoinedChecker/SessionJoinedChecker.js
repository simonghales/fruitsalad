import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
import {AppState} from '../../../../redux/index';

class SessionJoinedChecker extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
    children?: any,
    joinedOnly?: boolean,
    loadedSession: boolean,
    session: {},
    sessionUsers: {},
  };

  constructor(props) {
    super(props);
  }

  isJoined() {
    const {sessionUsers} = this.props;
    const firebase = this.context.store.firebase;
    if (getVal(firebase, 'isInitializing') !== true &&
      getVal(firebase, 'auth') !== undefined) {
      const currentUser = firebase.auth().currentUser;
      for (let key in sessionUsers) {
        if (sessionUsers[key].id === currentUser.uid) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const {children, joinedOnly = true, loadedSession} = this.props;
    if (!loadedSession) return null;
    const joinedSession = this.isJoined();
    if (joinedOnly && joinedSession) {
      return children;
    }
    if (!joinedOnly && !joinedSession) {
      return children;
    }
    return null;
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  const sessionUsers = state.firebase.data.sessionUsers;
  const sessionKey = (sessions) ? Object.keys(sessions)[0] : null;
  const session = (sessions) ? sessions[sessionKey] : null;

  return {
    loadedSession: isLoaded(sessionUsers),
    session: session,
    sessions: sessions,
    sessionUsers: sessionUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionJoinedChecker);
