import React, {Component} from 'react';
import './LandingScreen.css';
import {connect} from 'react-redux';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import {
  withRouter,
} from 'react-router-dom';
import PlainInput from '../PlainInput/PlainInput';
import MainButton from '../MainButton/MainButton';
import {SessionState, setSessionCode} from '../../redux/reducers/session';

class LandingScreen extends Component {

  props: {
    history: any,
    setSessionCode(sessionCode: string): void,
  };

  state: {
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionCode: '',
    };
    this.clearSessionCode = this.clearSessionCode.bind(this);
    this.handleSessionCodeInputChange = this.handleSessionCodeInputChange.bind(this);
    this.hostSession = this.hostSession.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }

  handleSessionCodeInputChange(event) {
    this.setState({
      sessionCode: event.target.value.toUpperCase(),
    });
  }

  hostSession() {
    const {history} = this.props;
    history.push('/session');
  }

  joinSession() {
    const {history, setSessionCode} = this.props;
    const {sessionCode} = this.state;
    if (!sessionCode) return;
    setSessionCode(sessionCode);
    history.push('/session');
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
    const {sessionCode} = this.state;
    return (
      <div className='LandingScreen'>
        <div className='LandingScreen__intro'>
          <h2 className='LandingScreen__intro__title'>fruit salad</h2>
        </div>
        <div className='LandingScreen__blurb'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam aut cumque debitis ducimus.
          </p>
          <p>
            Reiciendis tempora temporibus! Laboriosam omnis.
          </p>
        </div>
        <div className={classNames([
          'LandingScreen__options',
          {
            'LandingScreen__options--joinable': this.sessionCodeIsValid(),
          }
        ])}>
          <div className='LandingScreen__joinInputWrapper'>
            <PlainInput align='center'>
              <input type='text' className='LandingScreen__option LandingScreen__option--input'
                     value={sessionCode} onChange={this.handleSessionCodeInputChange}
                     placeholder='Enter session code'/>
            </PlainInput>
            <button className='LandingScreen__joinInput__clearButton' onClick={this.clearSessionCode}>
              <FaClose/>
            </button>
            <div className='LandingScreen__joinButtonWrapper'>
              <MainButton fullWidth={true}>
                <button className='LandingScreen__joinButton' onClick={this.joinSession}>Join Session</button>
              </MainButton>
            </div>
          </div>
          <div className='LandingScreen__options__divider'>or</div>
          <div className='LandingScreen__option LandingScreen__option--action' onClick={this.hostSession}>
            <MainButton fullWidth={true}>
              <button>Host Session</button>
            </MainButton>
          </div>
        </div>
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

