import React, {Component} from 'react';
import './SessionNotFound.css';
import {connect} from 'react-redux';
import Modal from '../../components/Modal/Modal';
import MainButton from '../../components/MainButton/MainButton';
import {SessionState} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class SessionNotFound extends Component {

  props: {
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.createSession = this.createSession.bind(this);
    this.joinOtherSession = this.joinOtherSession.bind(this);
  }

  createSession() {
  }

  joinOtherSession() {
  }

  render() {
    const {sessionCode} = this.props;
    return (
      <Modal>
        <div className='QuitSession'>
          <div className='QuitSession__background'></div>
          <div className='QuitSession__content'>
            <div className='QuitSession__sessionCode'>
              <div className='QuitSession__sessionCode__label'>Hmm, we couldn't find this session</div>
              <div className='QuitSession__sessionCode__code'>{sessionCode}</div>
            </div>
            <div className='QuitSession__create'>
              <MainButton fullWidth={true}>
                <button className='QuitSession__create__button' onClick={this.createSession}>
                  Host Session
                </button>
              </MainButton>
            </div>
            <div className='QuitSession__create'>
              <MainButton fullWidth={true}>
                <button className='QuitSession__create__button' onClick={this.joinOtherSession}>
                  Join other Session
                </button>
              </MainButton>
            </div>
            <div className='QuitSession__close'>
              Return to home screen
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    sessionCode: state.session.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionNotFound);
