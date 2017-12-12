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
import Button from '../../components/Button/Button';
import {isUserHost, isUserJoined} from '../../games/DrawDuo/logic/users';
import {SESSION_STATE_PENDING, SESSION_STATE_PLAYING} from '../../games/DrawDuo/logic/constants';
import SessionConfig from '../../components/SessionConfig/SessionConfig';

class SessionScreenHub extends Component {

  props: {
    loadedSession: boolean,
    gameInPlay: boolean,
    joined: boolean,
    match: any,
    session: {},
    sessionUsers: {},
    sessionCode: string,
    userJoined: boolean,
    userIsHost: boolean,
    setInvalidSessionEnforced(): void,
  };

  state: {
    displayOptions: boolean,
    redirecting: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
      redirecting: false,
    };
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
  }

  componentDidUpdate() {
  }

  share() {
    const {match} = this.props;
    const sessionCode = match.params.id.toUpperCase();
    if (navigator.share) {
      navigator.share({
        title: `Fruit Salad - ${sessionCode}`,
        text: 'Come play with me!',
        url: `https://fruitsalad.herokuapp.com/session/${sessionCode}`,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  start() {
    const {firebase, match} = this.props;
    const sessionKey = match.params.id.toUpperCase();

    const sessionRef = firebase.ref(`/sessions/${sessionKey}`);

    sessionRef.update({
      'drawDuo': true,
      'state': SESSION_STATE_PENDING,
    });

  }

  render() {

    const {sessionUsers, sessionCode, userIsHost} = this.props;
    const {displayOptions} = this.state;

    return (
      <Screen>
        <div className='SessionScreenHub'>
          <header className='SessionScreenHub__header'>
            <a href={`https://fruitsalad.party/${sessionCode}`} target='_blank'>fruitsalad.party/{sessionCode}</a>
          </header>
          <div className='SessionScreenHub__group'>
            <SessionGroup sessionUsers={sessionUsers}/>
          </div>
          {
            userIsHost && (
              <div className='SessionScreenHub__options'>
                <div className='SessionScreenHub__option'>
                  <Button onClick={() => {
                    this.setState({
                      displayOptions: true,
                    });
                  }}>options</Button>
                </div>
                <div className='SessionScreenHub__option'>
                  <Button onClick={this.start}>start</Button>
                </div>
              </div>
            )
          }
        </div>
        {displayOptions && <SessionConfig/>}
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState, props: { firebase: {} }) => {
  const {firebase} = props;
  const session = state.firebase.data.session;
  const sessionUsers = state.firebase.data.sessionUsers;
  const currentUser = firebase.auth().currentUser;
  const userJoined = isUserJoined(currentUser.uid, session);
  const userIsHost = isUserHost(currentUser.uid, session);
  return {
    gameInPlay: state.session.gameInPlay,
    joined: state.session.joined,
    loadedSession: isLoaded(session),
    session: session,
    sessionUsers: sessionUsers,
    sessionCode: state.session.sessionCode,
    userIsHost,
    userJoined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(true)),
  };
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHub)));