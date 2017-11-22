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
      return (sessionUsers && sessionUsers[currentUser.uid]) ? true : false;
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
  const session = state.firebase.data.session;
  const sessionUsers = state.firebase.data.sessionUsers;

  return {
    loadedSession: isLoaded(sessionUsers),
    session: session,
    sessionUsers: sessionUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionJoinedChecker);
