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
import SessionScreenJoinName from '../SessionScreenJoinName/SessionScreenJoinName';
import SessionScreenJoinDrawing from '../SessionScreenJoinDrawing/SessionScreenJoinDrawing';
import FullScreenLoadingMessage from '../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';

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
    currentScreen: string,
    joined: boolean,
    joining: boolean,
    redirecting: boolean,
    image: string,
    name: string,
  };

  canvasElem;

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'name',
      joined: false,
      joining: false,
      redirecting: false,
      image: '',
      name: '',
    };
    this.joinSession = this.joinSession.bind(this);
    this.setCanvasElem = this.setCanvasElem.bind(this);
    this.submitName = this.submitName.bind(this);
    this.submitDrawing = this.submitDrawing.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
  }

  componentDidUpdate() {
  }

  joinSession() {

    const {joining, name, image} = this.state;
    const {firebase, sessionCode} = this.props;

    if (joining) return;

    this.setState({
      joining: true,
    });

    const currentUser = firebase.auth().currentUser;

    joinAddUser(sessionCode, currentUser.uid, name, image, firebase)
      .then(() => {
      }, () => {
        console.warn('failed to join...');
      });

  }

  setCanvasElem(elem) {
    this.canvasElem = elem;
  }

  submitName(name: string) {
    this.setState({
      currentScreen: 'drawing',
      name: name,
    });
  }

  submitDrawing(image: string) {
    this.setState({
      currentScreen: 'submitting',
      image: image,
    }, this.joinSession);
  }

  render() {

    const {sessionCode} = this.props;
    const {currentScreen} = this.state;

    if (currentScreen === 'name') {
      return <SessionScreenJoinName submitName={this.submitName}/>;
    } else if (currentScreen === 'drawing') {
      return <SessionScreenJoinDrawing submitDrawing={this.submitDrawing}/>;
    } else {
      return (
        <FullScreenLoadingMessage title={sessionCode} subtitle='joining...'/>
      )
    }

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
