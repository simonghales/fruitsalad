import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSessionEnforced, setJoined} from '../../redux/reducers/session/reducer';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import SessionScreenJoinBottom from './SessionScreenJoinBottom';
import {generateNewUser} from '../../models/user';

class SessionScreenJoin extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    sessionKey: string,
    setJoined(): void,
    setInvalidSessionEnforced(): void,
  };

  state: {
    userName: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
    this.joinSession = this.joinSession.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
  }

  joinSession() {
    const {userName} = this.state;
    const {history, match, session, sessionKey} = this.props;

    const firebase = this.context.store.firebase;

    console.log('firebase', firebase);

    if (getVal(firebase, 'isInitializing') === true ||
      getVal(firebase, 'auth') === undefined) {
      console.warn('not authenticated???');
      return;
    } // todo - have a delay whilst auth is loading...

    if (!session) {
      console.warn('no session???', session, sessionKey);
      return;
    } // todo - have a delay whilst session is loading...

    const currentUser = firebase.auth().currentUser;

    this.context.store.firebase
      .push(`/sessions/${sessionKey}/users`, generateNewUser({
        id: currentUser.uid,
        name: userName,
      }))
      .then(() => {
        this.props.setJoined();
        history.push(`/session/${match.params.id}/hub`);
      });
  }

  setUserName(userName: string) {
    this.setState({
      userName,
    });
  }

  render() {

    const firebase = this.context.store.firebase;

    console.log('firebase', firebase);

    const {gameInPlay, joined, match} = this.props;
    const {userName} = this.state;

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
      <MainLayout>
        <MainLayoutContent>
          <div className='SessionScreenJoin'>
            <SessionJoin userName={userName} setUserName={this.setUserName}/>
          </div>
        </MainLayoutContent>
        <MainLayoutBottom>
          <SessionScreenJoinBottom joinSession={this.joinSession}/>
        </MainLayoutBottom>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const sessions = state.firebase.data.sessions;
  const sessionKey = (sessions) ? Object.keys(sessions)[0] : null;
  const session = (sessions) ? sessions[sessionKey] : null;
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    session: session,
    sessionKey: sessionKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJoined: () => dispatch(setJoined()),
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenJoin));
