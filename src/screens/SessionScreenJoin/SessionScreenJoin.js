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
import SessionJoinedChecker from '../session/components/SessionJoinedChecker/SessionJoinedChecker';
import {FIREBASE_STORAGE_IMAGES_PATH} from '../../firebase/storage';
import {joinAddUser} from '../../firebase/user';

class SessionScreenJoin extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    setJoined(): void,
    setInvalidSessionEnforced(): void,
  };

  state: {
    joining: boolean,
    userName: string,
  };

  canvasElem;

  constructor(props) {
    super(props);
    this.state = {
      joining: false,
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

  joinSession() {
    const {userName} = this.state;
    const {history, match, session} = this.props;
    const sessionKey = match.params.id;

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

    this.setState({
      joining: true,
    });

    const currentUser = firebase.auth().currentUser;

    const image = (this.canvasElem) ? this.canvasElem.state.canvas.toDataURL('image/png').replace('data:image/png;base64,', '') : '';

    joinAddUser(sessionKey, currentUser.uid, userName, image, firebase)
      .then((response) => {
        history.push(`/session/${match.params.id}/hub`);
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

    const {gameInPlay, joined, match} = this.props;
    const {userName} = this.state;

    if (joined && gameInPlay) {
      return (
        <Redirect to={{
          pathname: `/session/${match.params.id}`,
        }}/>
      );
    }

    return (
      <MainLayout>
        <MainLayoutContent>
          <div className='SessionScreenJoin'>
            <SessionJoin userName={userName} setCanvasElem={this.setCanvasElem} setUserName={this.setUserName}
                         joinSession={this.joinSession}/>
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
  const session = state.firebase.data.session;
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    session: session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setJoined: () => dispatch(setJoined()),
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenJoin));
