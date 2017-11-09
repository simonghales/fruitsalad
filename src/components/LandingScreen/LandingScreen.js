import React, {Component} from 'react';
import './LandingScreen.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setSessionCode} from '../../redux/reducers/session';
import HostSession from '../HostSession/HostSession';
import MainLayout from '../MainLayout/MainLayout';
import MainLayoutContent from '../MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../MainLayoutBottom/MainLayoutBottom';

class LandingScreen extends Component {

  props: {
    history: any,
    setSessionCode(sessionCode: string): void,
  };

  state: {
    hostSessionModalOpen: boolean,
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.state = {
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
    history.push('/session');
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

  render() {
    const {hostSessionModalOpen, sessionCode} = this.state;
    return (
      <div className={classNames([
        'LandingScreen',
        {
          'LandingScreen--joinable': this.sessionCodeIsValid(),
        }
      ])}>
        <MainLayout>
          <MainLayoutContent>
            <div className='LandingScreen__intro'>
              <div className='LandingScreen__intro__icon'></div>
              <h2 className='LandingScreen__intro__title'>fruit salad</h2>
              <p className='LandingScreen__intro__slogan'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </MainLayoutContent>
          <MainLayoutBottom>
            <div className='LandingScreen__bottom'>
              <div className='LandingScreen__bottom__side'>othe</div>
              <div className='LandingScreen__bottom__input'>
                <input type='text' placeholder='Enter session code'/>
              </div>
              <div className='LandingScreen__bottom__side'>
                <Link to='/session/kittens'>join</Link>
              </div>
            </div>
          </MainLayoutBottom>
        </MainLayout>
        <TransitionGroup>
          {
            hostSessionModalOpen ? (
              <CSSTransition
                timeout={350}
                classNames='fade'
                key='hostSession'>
                <HostSession close={this.closeHostSessionModal} createSession={this.createSession}/>
              </CSSTransition>
            ) : null
          }
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    sessionCode: state.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingScreen));

