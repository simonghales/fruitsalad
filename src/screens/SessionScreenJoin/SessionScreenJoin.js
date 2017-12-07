import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebaseConnect, isLoaded, isEmpty, getVal} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import './SessionScreenJoin.css';
import SessionJoin from '../../components/SessionJoin/SessionJoin';
import {AppState} from '../../redux/index';
import {setInvalidSessionEnforced, setJoined} from '../../redux/reducers/session/reducer';
import {joinAddUser} from '../../firebase/user';
import Screen from '../../components/Screen/Screen';
import {isUserJoined} from '../../games/DrawDuo/logic/users';

class SessionScreenJoin extends Component {

  props: {
    match: any,
    session: {},
    sessionCode: string,
    userJoined: boolean,
    setJoined(): void,
    setInvalidSessionEnforced(): void,
  };

  state: {
    joined: boolean,
    joining: boolean,
    redirecting: boolean,
    userName: string,
  };

  canvasElem;

  constructor(props) {
    super(props);
    this.state = {
      joined: false,
      joining: false,
      redirecting: false,
      userName: '',
    };
    this.joinSession = this.joinSession.bind(this);
    this.setCanvasElem = this.setCanvasElem.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
  }

  componentDidUpdate() {
    if (this.state.joined) {
      this.tryToRedirect();
    }
  }

  tryToRedirect() {
    if (this.props.userJoined && !this.state.redirecting) {
      const {history, sessionCode} = this.props;
      this.setState({
        redirecting: true,
      });
      history.push(`/session/${sessionCode}/hub`);
    }
  }

  joinSession() {

    console.log('join session..');

    const {joining, userName} = this.state;
    const {history, firebase, match, session, sessionCode} = this.props;
    const sessionKey = sessionCode;

    if (joining) return;

    if (getVal(firebase, 'isInitializing') === true ||
      getVal(firebase, 'auth') === undefined) {
      console.warn('not authenticated???');
      return;
    } // todo - have a delay whilst auth is loading...

    if (!session) {
      console.warn('no session???', session, sessionKey);
      return;
    } // todo - have a delay whilst session is loading...

    this.setState({
      joining: true,
    });

    const currentUser = firebase.auth().currentUser;

    const image = (this.canvasElem) ? this.canvasElem.state.canvas.toDataURL('image/png').replace('data:image/png;base64,', '') : '';

    joinAddUser(sessionKey, currentUser.uid, userName, image, firebase)
      .then((response) => {
        this.setState({
          joined: true,
        });
      }, () => {
        console.warn('failed to join...');
      });

  }

  setCanvasElem(elem) {
    this.canvasElem = elem;
  }

  setUserName(userName: string) {
    this.setState({
      userName,
    });
  }

  render() {

    const {userName} = this.state;

    return (
      <Screen>
        <div className='SessionScreenJoin'>
          <SessionJoin userName={userName} setCanvasElem={this.setCanvasElem} setUserName={this.setUserName}
                       joinSession={this.joinSession}/>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState, {firebase}) => {
  const session = state.firebase.data.session;
  const currentUser = firebase.auth().currentUser;
  const userJoined = isUserJoined(currentUser.uid, session);
  return {
    session: session,
    sessionCode: state.session.sessionCode,
    userJoined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJoined: () => dispatch(setJoined()),
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenJoin)));
