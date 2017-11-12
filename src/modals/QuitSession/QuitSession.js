import React, {Component} from 'react';
import './QuitSession.css';
import {connect} from 'react-redux';
import Modal from '../../components/Modal/Modal';
import MainButton from '../../components/MainButton/MainButton';
import {SessionState} from '../../redux/reducers/session';

class QuitSession extends Component {

  props: {
    sessionCode: string,
    close(): void,
    quit(): void,
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
    const {sessionCode, quit} = this.props;
    return (
      <Modal>
        <div className='QuitSession'>
          <div className='QuitSession__background' onClick={this.closeModal}></div>
          <div className='QuitSession__content'>
            <div className='QuitSession__sessionCode'>
              <div className='QuitSession__sessionCode__label'>Are you sure you wish to quit?</div>
              <div className='QuitSession__sessionCode__code'>{sessionCode}</div>
            </div>
            <div className='QuitSession__create'>
              <MainButton fullWidth={true}>
                <button className='QuitSession__create__button' onClick={quit}>
                  Quit Session
                </button>
              </MainButton>
            </div>
            <div className='QuitSession__close' onClick={this.closeModal}>
              Oops! Close this menu
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    sessionCode: state.sessionCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuitSession);
