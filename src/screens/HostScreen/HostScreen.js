import React, {Component} from 'react';
import './HostScreen.css';
import Screen from '../../components/Screen/Screen';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import {withRouter} from 'react-router';
import {AppState} from '../../redux/index';
import {connect} from 'react-redux';
import {firebaseConnect, isEmpty} from 'react-redux-firebase';
import {generateNewSession} from '../../models/session';
import {SESSION_STATE_SETTING_UP} from '../../games/DrawDuo/logic/constants';
import {MAX_SESSION_CODE_LENGTH} from '../../constants/forms';
import analyticsEvents from '../../analytics/analyticsEvents';

class HostScreen extends Component {

  props: {
    firebase: {},
    history: {},
  };

  state: {
    joining: boolean,
    sessionInput: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      joining: false,
      sessionInput: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSessionInputChange = this.handleSessionInputChange.bind(this);
    this.hostSession = this.hostSession.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.hostSession();
    return false;
  }

  handleSessionInputChange(event) {
    this.setState({
      sessionInput: event.target.value.substring(0, MAX_SESSION_CODE_LENGTH).toLowerCase(),
    });
  }

  canSubmit() {
    return (this.state.sessionInput !== '');
  }

  hostSession() {
    const {joining} = this.state;
    if (!this.canSubmit()) return;
    if (joining) return;
    this.setState({
      joining: true,
    });
    analyticsEvents.hostSessionScreenButtonClicked();
    this.checkAndCreateSession();
  }

  checkAndCreateSession() {
    const {firebase, history} = this.props;
    const {sessionInput} = this.state;

    const sessionCode = sessionInput.toLowerCase();

    const sessionRef = firebase.ref(`/sessions/${sessionCode}`);

    sessionRef.once('value', snapshot => {
      console.log('sessionRef', sessionRef);
      const sessionData = snapshot.val();
      if (!sessionData || isEmpty(sessionData)) {
        this.createSession();
      } else {
        console.log('already created...', sessionData);
        history.push(`/session/${sessionCode}`);
      }
    });

  }

  createSession() {
    const {firebase, history} = this.props;
    const {sessionInput} = this.state;

    const sessionCode = sessionInput.toLowerCase();

    const currentUser = firebase.auth().currentUser;

    firebase.set(`/sessions/${sessionCode}`, generateNewSession({
      id: sessionCode,
      host: currentUser.uid,
      users: {},
      state: SESSION_STATE_SETTING_UP,
    }))
      .then(() => {
        history.push(`/session/${sessionCode}`);
      });
  }

  goBack() {
    const {history} = this.props;
    history.push(`/`);
  }

  render() {

    const {sessionInput} = this.state;
    const canSubmit = this.canSubmit();

    return (
      <Screen>
        <div className='HostScreen'>
          <form className='HostScreen__content' onSubmit={this.handleFormSubmit}>
            <div className='HostScreen__title'>
              <Heading size='small'>You are hosting as a Guest</Heading>
            </div>
            <div className='HostScreen__input'>
              <Input value={sessionInput} type='text' placeholder='enter session code'
                     onChange={this.handleSessionInputChange}/>
            </div>
            <div className='HostScreen__submit'>
              <Button type='firm' disabled={!canSubmit} onClick={this.hostSession}>create</Button>
            </div>
            <div className='HostScreen__backWrapper'>
              <div className='HostScreen__back' onClick={this.goBack}>go back</div>
            </div>
          </form>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const session = state.firebase.data.session;
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(withRouter(HostScreen)));