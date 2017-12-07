import React, {Component} from 'react';
import './LandingScreen.css';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import {
  withRouter,
} from 'react-router-dom';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setSessionCode} from '../../redux/reducers/session/reducer';
import HostSession from '../HostSession/HostSession';
import MainLayout from '../MainLayout/MainLayout';
import MainLayoutContent from '../MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../MainLayoutBottom/MainLayoutBottom';
import BottomSide from '../BottomSide/BottomSide';
import BottomFlex from '../BottomFlex/BottomFlex';
import BottomMiddle from '../BottomMiddle/BottomMiddle';
import {AppState} from '../../redux/index';
import DancingFruit from '../DancingFruit/DancingFruit';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Screen from '../Screen/Screen';

class LandingScreen extends Component {

  sessionCodeInputElement;

  props: {
    firebase: any,
    history: any,
    setSessionCode(sessionCode: string): void,
  };

  state: {
    joinActive: boolean,
    hostActive: boolean,
    hostSessionModalOpen: boolean,
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      joinActive: false,
      hostActive: false,
      hostSessionModalOpen: false,
      sessionCode: '',
    };
    this.clearSessionCode = this.clearSessionCode.bind(this);
    this.createSession = this.createSession.bind(this);
    this.handleSessionCodeInputChange = this.handleSessionCodeInputChange.bind(this);
    this.hostSession = this.hostSession.bind(this);
    this.closeHostSessionModal = this.closeHostSessionModal.bind(this);
    this.openHostSessionModal = this.openHostSessionModal.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.setJoinActive = this.setJoinActive.bind(this);
    this.setHostActive = this.setHostActive.bind(this);
    this.closeJoinHost = this.closeJoinHost.bind(this);
    this.focusSessionCodeInput = this.focusSessionCodeInput.bind(this);
    this.submitSessionCode = this.submitSessionCode.bind(this);

    this.goToJoinScreen = this.goToJoinScreen.bind(this);
    this.goToHostScreen = this.goToHostScreen.bind(this);
  }

  submitSessionCode(event) {
    event.preventDefault();
    this.handleRightClick();
  }

  handleSessionCodeInputChange(event) {
    this.setState({
      sessionCode: event.target.value.toUpperCase(),
    });
  }

  hostSession() {
    this.openHostSessionModal();
  }

  closeHostSessionModal() {
    console.log('close...');
    this.setState({
      hostSessionModalOpen: false,
    });
  }

  openHostSessionModal() {
    this.setState({
      hostSessionModalOpen: true,
    });
  }

  createSession() {
    const {history} = this.props;
    const {sessionCode} = this.state;
    history.push(`/session/${sessionCode}/host`);
  }

  joinSession() {
    const {history, setSessionCode} = this.props;
    const {sessionCode} = this.state;
    if (!sessionCode) return;
    setSessionCode(sessionCode);
    history.push(`/session/${sessionCode}`);
  }

  clearSessionCode() {
    this.setState({
      sessionCode: '',
    });
  }

  sessionCodeIsValid() {
    const {sessionCode} = this.state;
    return (sessionCode.length > 0);
  }

  handleLeftClick() {
    if (!this.state.joinActive && !this.state.hostActive) {
      this.setHostActive();
      this.focusSessionCodeInput();
    } else {
      this.closeJoinHost();
    }
  }

  handleRightClick() {
    if (!this.state.joinActive && !this.state.hostActive) {
      this.setJoinActive();
      this.focusSessionCodeInput();
    } else {
      if (this.state.joinActive) {
        this.joinSession();
      } else {
        this.createSession();
      }
    }
  }

  focusSessionCodeInput() {
    this.sessionCodeInputElement.focus();
  }

  closeJoinHost() {
    this.setState({
      joinActive: false,
      hostActive: false,
      sessionCode: '',
    });
  }

  setJoinActive() {
    this.setState({
      joinActive: true,
    });
  }

  setHostActive() {
    this.setState({
      hostActive: true,
      sessionCode: '',
    });
  }

  getSessionCodeInputLabel() {
    const {hostActive} = this.state;
    if (hostActive) {
      return 'Your session code will be';
    } else {
      return 'Enter session code';
    }
  }

  goToJoinScreen() {
    const {history} = this.props;
    history.push('/join');
  }

  goToHostScreen() {
    const {history} = this.props;
    history.push('/host');
  }

  render() {
    const {
      joinActive,
      hostActive,
      hostSessionModalOpen, sessionCode
    } = this.state;
    return (
      <Screen>
        <div className={classNames([
          'LandingScreen',
          {
            'LandingScreen--joinable': this.sessionCodeIsValid(),
          }
        ])}>
          <div className='LandingScreen__intro'>
            <div className='LandingScreen__content'>
              <div className='LandingScreen__title'>
                <Heading size='huge'>fruit salad</Heading>
                <Heading size='medium'>play games together</Heading>
              </div>
              <div className='LandingScreen__options'>
                <div className='LandingScreen__option'>
                  <Button onClick={this.goToJoinScreen}>join</Button>
                </div>
                <div className='LandingScreen__option'>
                  <Button onClick={this.goToHostScreen}>host</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    firebase: state.firebase,
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

const wrappedLandingScreen = firebaseConnect()(LandingScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(wrappedLandingScreen));

