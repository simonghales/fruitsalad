import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SessionScreenHost.css';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {SessionState, setInvalidSessionEnforced, setSessionCreated} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import {generateNewSession} from '../../models/session';
import {generateNewUser} from '../../models/user';
import {isEmpty, isLoaded} from 'react-redux-firebase';
import JumpingLetters from '../../components/JumpingLetters/JumpingLetters';
import Heading from '../../components/Heading/Heading';
import FullScreenLoadingMessage from '../../components/FullScreenLoadingMessage/FullScreenLoadingMessage';
import Button from '../../components/Button/Button';

class SessionScreenHost extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  props: {
    loadedSession: boolean,
    history: {},
    match: any,
    sessionCode: string,
    setInvalidSessionEnforced(): void,
  };

  state: {
    sessionAlreadyCreated: boolean,
    sessionCreated: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionAlreadyCreated: false,
      sessionCreated: false,
    };
    this.checkAndCreateSession = this.checkAndCreateSession.bind(this);
    this.createSession = this.createSession.bind(this);
    this.goToJoinStep = this.goToJoinStep.bind(this);
  }

  componentDidMount() {
    const {setInvalidSessionEnforced} = this.props;
    setInvalidSessionEnforced();
    this.checkAndCreateSession();
  }

  checkAndCreateSession() {
    const {match} = this.props;
    const sessionKey = match.params.id.toUpperCase();

    const sessionRef = this.context.store.firebase.ref(`/sessions/${sessionKey}`);

    sessionRef.once('value', snapshot => {
      console.log('sessionRef', sessionRef);
      const sessionData = snapshot.val();
      if (!sessionData) {
        this.createSession();
      } else {
        console.log('already created...', sessionData);
        this.setState({
          sessionAlreadyCreated: true,
        });
      }
    });

  }

  createSession() {
    const {match} = this.props;

    const firebase = this.context.store.firebase;
    const currentUser = firebase.auth().currentUser;
    const sessionKey = match.params.id.toUpperCase();

    firebase.set(`/sessions/${sessionKey}`, generateNewSession({
      id: match.params.id,
      host: currentUser.uid,
      users: {
        [currentUser.uid]: generateNewUser({
          id: currentUser.uid,
          name: 'The Host',
        })
      },
      state: 'pending',
    }))
      .then((response) => {
        this.setState({
          sessionCreated: true,
        });
      });
  }

  goToJoinStep() {
    const {history, sessionCode} = this.props;
    history.push(`/session/${sessionCode}/join`);
  }

  render() {
    const {sessionAlreadyCreated, sessionCreated} = this.state;
    const {loadedSession, sessionCode} = this.props;

    const canRedirect = ((loadedSession && sessionAlreadyCreated) || (sessionCreated && loadedSession));

    if (!canRedirect) {
      return (
        <FullScreenLoadingMessage title={sessionCode} subtitle='creating session...'/>
      )
    }

    return (
      <div className='SessionScreenHost'>
        <div className='SessionScreenHost__content'>
          <Heading size='huge'>{sessionCode}</Heading>
          <div>
            <div className='SessionScreenHost__linkBlock'>
              <div>Invite others to join at</div>
              <a href={`https://fruitsalad.party/${sessionCode}`} target='_blank'>fruitsalad.party/{sessionCode}</a>
            </div>
            <div className='SessionScreenHost__linkBlock'>
              <div>You need to display and host the game at</div>
              <a href={`https://fruitsalad.party/host/${sessionCode}`}
                 target='_blank'>fruitsalad.party/host/{sessionCode}</a>
            </div>
            <div className='SessionScreenHost__join'>
              <Button type='firm' mobileFullWidth={true} onClick={this.goToJoinStep}>join</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {
    loadedSession: isLoaded(session) && !isEmpty(session),
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidSessionEnforced: () => dispatch(setInvalidSessionEnforced(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionScreenHost));


