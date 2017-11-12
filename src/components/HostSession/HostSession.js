import React, {Component} from 'react';
import './HostSession.css';
import {connect} from 'react-redux';
import Modal from '../Modal/Modal';
import MainButton from '../MainButton/MainButton';

class HostSession extends Component {

  props: {
    sessionCode: string,
    close(): void,
    createSession(): void,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const {close} = this.props;
    close();
  }

  render() {
    const {createSession, sessionCode} = this.props;
    return (
      <Modal>
        <div className='HostSession'>
          <div className='HostSession__background' onClick={this.closeModal}></div>
          <div className='HostSession__content'>
            <div className='HostSession__sessionCode'>
              <div className='HostSession__sessionCode__label'>Your Session Code will be</div>
              <div className='HostSession__sessionCode__code'>{sessionCode}</div>
            </div>
            <div className='HostSession__create'>
              <MainButton fullWidth={true}>
                <button className='HostSession__create__button' onClick={createSession}>Host Session</button>
              </MainButton>
            </div>
            <div className='HostSession__close' onClick={this.closeModal}>
              Oops! Close this menu
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

export default connect(mapStateToProps, mapDispatchToProps)(HostSession);
