import React, {Component} from 'react';
import './SessionNotFound.css';
import {connect} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import MainButton from '../../components/MainButton/MainButton';
import {SessionState} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';

class SessionNotFound extends Component {

  props: {
    history: {},
    sessionCode: string,
  };

  constructor(props) {
    super(props);
    this.returnToHome = this.returnToHome.bind(this);
  }

  returnToHome() {
    const {history} = this.props;
    history.push(`/`);
  }

  render() {
    const {sessionCode} = this.props;
    return (
      <Modal>
        <div className='SessionNotFound'>
          <div className='SessionNotFound__background'></div>
          <div className='SessionNotFound__content'>
            <div className='SessionNotFound__sessionCode'>
              <div className='SessionNotFound__sessionCode__label'>Hmm, we couldn't find this session</div>
              <div className='SessionNotFound__sessionCode__code'>{sessionCode}</div>
            </div>
            <div className='SessionNotFound__create'>
              <MainButton fullWidth={true}>
                <button className='SessionNotFound__create__button' onClick={this.returnToHome}>
                  Return to home screen
                </button>
              </MainButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

// const mapStateToProps = (state: AppState) => {
//   return {};
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SessionNotFound));

export default withRouter(SessionNotFound);
